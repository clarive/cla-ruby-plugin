(function(params) {
    var data = params.data;

    var serverComboBox = Cla.ui.ciCombo({
        name: 'server',
        role: 'Server',
        fieldLabel: _('Server'),
        value: data.server || '',
        allowBlank: false,
        width: 400,
        with_vars: 1
    });
    
    var userTextField = Cla.ui.textField({
        name: 'user',
        fieldLabel: _('User'),
        value: data.user || '',
        allowBlank: true
    });

    var rubyPathTextField = Cla.ui.textField({
        name: 'rubyPath',
        fieldLabel: _('Ruby path'),
        value: params.data.rubyPath || '',
    });

    var argumentsTextField = Cla.ui.arrayGrid({
        name: 'rubyArgs',
        fieldLabel: _('Ruby parameters'),
        value: params.data.rubyArgs,
        description: _('Ruby parameters'),
        default_value: '.',
    });

    var rubyCodeEditor = Cla.ui.codeEditor({
        name: 'code',
        fieldLabel: _('Code Editor'),
        value: params.data.code || '',
        mode: 'ruby',
        height: 500,
        anchor: '100%'
    });

    var remoteTempPathTextField = Cla.ui.textField({
        name: 'remoteTempPath',
        fieldLabel: _('Remote temp path'),
        value: params.data.remoteTempPath || '/tmp',
        allowBlank: false
    });

    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: params.data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: params.data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: params.data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: params.data.rcError,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            serverComboBox,
            userTextField,
            rubyPathTextField,
            argumentsTextField,
            remoteTempPathTextField,
            rubyCodeEditor,
            errorBox
        ]
    });


    return panel;
})