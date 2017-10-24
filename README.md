# Ruby Plugin

<img src="https://cdn.rawgit.com/clarive/cla-ruby-plugin/master/public/icon/ruby.svg?sanitize=true" alt="Ruby Plugin" title="Ruby Plugin" width="120" height="120">

The Ruby plugin will allow you to execute a Ruby code on the server of your choice in Clarive and to view its result.

## What is Ruby?

A dynamic, open source programming language with a focus on simplicity and productivity.  It has an elegant syntax that
is natural to read and easy to write.

## Requirements

To be able to use the plugin correctly, you must have Ruby installed on the server where you wish to execute the code.

## Installing

To install the plugin, place the `cla-ruby-plugin` folder inside `$CLARIVE_BASE/plugins` directory in the Clarive
instance.

## Parameters

The service will execute the code you write in it on the server you specify. The service will create a temporary file
with the code, which will be shipped to the specified server.

The parameters available for this service are:

- **Server (variable name: server)** - The GenericServer Resource where you wish to execute the code.
- **User (user)** - User which will be used to connect to the server.
- **Ruby path (ruby_path)** - Full path for Ruby launching script, including the file. If you leave it empty, the plugin will launch
  *Ruby* as a system environment variable.
- **Ruby parameters (ruby_args)** - Additional flags for the Ruby command.
- **Remote temp path (remote_temp_path)** - Temporary path to which the file with the code will be shipped.
- **Code Editor (code)** - Enter here the code you wish to execute.

**Only Clarive EE**

- **Errors and Output** - These two fields deal with managing control errors. The options are:
   - **Fail and Output Error** - Search for the configured error pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Warning and Output warning** - Search for the configured warning pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Custom** - If combo box errors is set to custom, a new form is displayed to define the behavior with these
     fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
   - **Warn** - Range of return code values to warn the user. A warning will be displayed in the monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
     monitor.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Run Ruby code**

Example:

```yaml
      Server: ruby_server
      Ruby path: /sytem/ruby.sh
      Ruby parameters:
      Remote temp path: /tmp
      Code Editor: print "Hello, World!\n"
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

```yaml
rule: Ruby demo
do:
   - ruby_script:
       server: ruby_server  # Required. Use the mid set to the resource you created
       user: ${username}    
       remote_temp_path: "/tmp"    # Required
       ruby_args: ["-d"]         
       code: |                     # Required
          print "Hello, World!\n"
```

##### Outputs

###### Success

The plugin will return all the console output you set in the Ruby code.

```yaml
do:
    - myvar = ruby_script:
       server: ruby_server   # use the mid set to the resource you created
       user: "clarive_user"
       remote_temp_path: "/tmp"
       ruby_args: ["-d"]        
       code: |
          print "Hello, World!\n"
    - echo: ${myvar}
```

For this command the output will be similar to this one:

```yaml
Hello, World! 
```

###### Possible configuration failures

**Code failed**

```yaml
Error running remote script
```

Make sure that the option is available and you code is correct to be executed in Ruby.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "ruby_script": "server"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Code` not available for op "ruby_script"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.