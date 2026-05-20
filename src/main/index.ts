import "reflect-metadata"; 
import { app, BrowserWindow, shell, ipcMain, session } from 'electron'; 
import { AppDataSource } from "./data-source";
import express from 'express';
import apiRouter from './routes/router';
import 'dotenv/config'; 
import cors from 'cors';
import { optimizer, is } from '@electron-toolkit/utils' 
import { join } from 'path'
import icon from '../../resources/icon.png?asset' 
import mysql from 'mysql2';


const api_app = express();

// ipcMain.handle('api-signin', async (event, loginData) => {
//   return await axios.post('http://127.0.0.1', loginData);
// });

app.disableHardwareAcceleration();
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('use-gl', 'swiftshader');

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    show: false,
    fullscreen: true,    
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      webSecurity: false, 
      allowRunningInsecureContent: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false      
    },
  });
  mainWindow.loadURL('http://localhost:9229');    

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async() => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");    
  } catch (err) {
      console.error("Error during Data Source initialization", err);
  }

  ipcMain.handle('get-data-channel', async (event, data) => {
    return `Main process received: ${data}`;
  });  
  // const allowedOrigin = 'http://localhost:5173'; 
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       'Access-Control-Allow-Origin': [allowedOrigin],
  //       'Access-Control-Allow-Headers': ['*'],
  //     },
  //   });
  // });

  // const win = new BrowserWindow({ /* ... */ });
  // win.loadURL(allowedOrigin);




  app.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'rey',
  password: 'rey',
  database: 'electron_db'
});

connection.connect((error) => {
  if (error) {
    console.error("Database connection failed:", error);
    return;
  }
  console.log("Database connected");
});

api_app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false
}));

api_app.use(express.json());
api_app.use('/api', apiRouter);
api_app.listen(9229, () => console.log('API Running on 9229'));
