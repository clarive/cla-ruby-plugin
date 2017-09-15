# Ruby Plugin

The Ruby plugin will allow you to execute a Ruby code on the server of your choice in Clarive and to view its result.

## What is Ruby?

A dynamic, open source programming language with a focus on simplicity and productivity.  It has an elegant syntax that
is natural to read and easy to write.

## Requirements

To be able to use the plugin correctly, you must have Ruby installed on the server where you wish to execute the code.

## Installing

To install the plugin, place the `cla-ruby-plugin` folder inside `CLARIVE_BASE/plugins` directory in the Clarive
instance.

## How to Use

Once the plugin is placed in its folder, you can start using it by going to your Clarive instance.

After restarting your Clarive instance, you will have a new palette service called 'Run Ruby Code'.

### Run Ruby Code

The service will execute the code you write in it on the server you specify. The service will create a temporary file
with the code, which will be shipped to the specified server.

The parameters available for this service are:

- **Server** - The GenericServer Resource where you wish to execute the code.
- **Ruby path** - Full path for Ruby launching script, including the file. If you leave it empty, the plugin will launch
  *Ruby* as a system environment variable.
- **Ruby parameters** - Additional flags for the Ruby command.
- **Remote temp path** - Temporary path to which the file with the code will be shipped.
- **Code Editor** - Enter here the code you wish to execute.
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

The plugin will return all the console output you set in the Ruby code.

Configuration example:

      Server: ruby_server
      Ruby path: /sytem/ruby.sh
      Ruby parameters:
      Remote temp path: /tmp
      Code Editor: print "Hello, World!\n"
