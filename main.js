const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const ipc = require('ipc');

// Report crashes to our server.
require('crash-reporter').start();

const database = require('./database');
const menuTemplate = require('./menu_template');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});
  const webContents = mainWindow.webContents;

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  ipc.on('connect-database', (file) => {
    database.connect(file);
    getTablesHandler();
  });

  ipc.on('get-tables', () => {
    getTablesHandler();
  });

  ipc.on('get-table-content', (event, name) => {
    database.getTable(name).then((table) => {
      event.sender.send('table-content', table);
    }).catch((err) => {
      if (err) console.log(err)
    });
  });

  function getTablesHandler() {
    database.getTables().then((tables) => {
      webContents.send('tables', tables);
    }).catch((err) => {
      if (err) console.log(err)
    });
  }
});

