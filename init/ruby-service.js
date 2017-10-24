var reg = require("cla/reg");

reg.register('service.ruby.run', {
    name: _('Run Ruby Code'),
    icon: '/plugin/cla-ruby-plugin/icon/ruby.svg',
    form: '/plugin/cla-ruby-plugin/form/ruby-form.js',
    rulebook: {
        moniker: 'ruby_script',
        description: _('Executes a Ruby script'),
        required: [ 'server', 'code', 'remote_temp_path'],
        allow: ['ruby_path' , 'server', 'code', 'remote_temp_path', 'ruby_args', 'user', 'errors'],
        mapper: {
            'remote_temp_path':'remoteTempPath',
            'ruby_path': 'rubyPath',
            'ruby_args': 'rubyArgs'
        },
        examples: [{
            ruby_script: {
                server: 'ruby_script',
                user: 'clarive_user',
                remote_temp_path: "/tmp/scripts/",
                ruby_path: "",
                ruby_args: ["-d"],
                code: `print "Hello, World!\n"`,
                errors: "fail"
            }
        }]
    },
    handler: function(ctx, config) {

        var log = require("cla/log");
        var fs = require("cla/fs");
        var path = require('cla/path');
        var reg = require('cla/reg');
        var proc = require("cla/process");
        var CLARIVE_BASE = proc.env('CLARIVE_BASE');
        var CLARIVE_TEMP = proc.env('TMPDIR');
        var filePath;
        var errors = config.errors || "fail";
        var server = config.server;
        var response;
        var remoteTempPath = config.remoteTempPath || "/tmp/";
        var isJob = ctx.stash("job_dir");
        var rubyPath = config.rubyPath || "";
        var fileName = "clarive-ruby-code-" + Date.now() + ".rb";
        var user = config.user || "";

        function remoteCommand(params, command, server, errors, user) {
            var output = reg.launch('service.scripting.remote', {
                name: _('Ruby execute code'),
                config: {
                    errors: errors,
                    server: server,
                    user: user,
                    path: command,
                    output_error: params.output_error,
                    output_warn: params.output_warn,
                    output_capture: params.output_capture,
                    output_ok: params.output_ok,
                    meta: params.meta,
                    rc_ok: params.rcOk,
                    rc_error: params.rcError,
                    rc_warn: params.rcWarn
                }
            });
            return output;
        }

        function shipFiles(server, filePath, remoteTempPath, user) {
            var output = reg.launch('service.fileman.ship', {
                name: _('Ruby ship file'),
                config: {
                    server: server,
                    user: user,
                    local_path: filePath,
                    remote_path: remoteTempPath
                }
            });
        }


        if (isJob) {
            filePath = path.join(isJob, fileName);
            fs.createFile(filePath, config.code);
        } else {
            filePath = path.join(CLARIVE_TEMP, fileName);
            fs.createFile(filePath, config.code);
        }

        var rubyArgs = config.rubyArgs || [];
        var rubyParams = rubyArgs.join(" ");
        var rubyCommand;
        if (rubyPath == '' || !rubyPath) {
            rubyCommand = "ruby ";
        } else {
            rubyCommand = rubyPath + " ";
        }

        shipFiles(server, filePath, remoteTempPath, user);
        var remoteFilePath = path.join(remoteTempPath, fileName);
        var rubyRemoteCommand = rubyCommand + rubyParams + " " + remoteFilePath;

        log.info(_("Executing Ruby code"));
        response = remoteCommand(config, rubyRemoteCommand, server, errors, user);
        reg.launch('service.scripting.remote', {
            name: _('Ruby remove file'),
            config: {
                errors: errors,
                server: server,
                user: user,
                path: "rm " + remoteFilePath
            }
        });
        log.info(_("Ruby code executed: "), response.output);
        fs.deleteFile(filePath);

        return response.output;
    }
});
