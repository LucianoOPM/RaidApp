import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import getSequelizeInstance from './db/dbConnection'
import { criteriaService, userService, valuesService } from './service/index.service'
import { NewUser } from './types/user.type'
import { ErrorResponse, SuccessResponse } from './types/response.type'
import { NewCriteria } from './types/criterias.type'
import { ToUpdateValues } from './types/values.type'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.maximize()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //   mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  // } else {
  //   mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  try {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    await getSequelizeInstance().sync({alter: true})
    ipcMain.handle('getUsers', async (): Promise<ErrorResponse | SuccessResponse | void> => {
      try {
        return await userService.getUsers()
      } catch (error) {
        console.log(error)
      }
    })
    ipcMain.handle(
      'createUser',
      async (_event, user: NewUser): Promise<ErrorResponse | SuccessResponse | void> => {
        try {
          return await userService.createUser(user)
        } catch (error) {
          console.log(error)
        }
      }
    )
    ipcMain.handle(
      'getUser',
      async (_event, idUser: string): Promise<ErrorResponse | SuccessResponse | void> => {
        try {
          return await userService.getUserById(idUser)
        } catch (error) {
          console.log(error)
        }
      }
    )
    ipcMain.handle('getCriterias', async (): Promise<ErrorResponse | SuccessResponse | void> => {
      try {
        return await criteriaService.getCriterias()
      } catch (error) {
        console.log(error)
      }
    })

    ipcMain.handle(
      'createCriteria',
      async (_event, values: NewCriteria): Promise<SuccessResponse | ErrorResponse | void> => {
        try {
          return await criteriaService.createCriteria(values)
        } catch (error) {
          console.log(error)
        }
      }
    )

    ipcMain.handle(
      'saveCriteriaValues',
      async (_event, idCriteria: number): Promise<ErrorResponse | SuccessResponse | void> => {
        try {
          return await valuesService.createValues(idCriteria)
        } catch (error) {
          console.log(error)
        }
      }
    )

    ipcMain.handle(
      'getByCriteria',
      async (_event, id: string): Promise<ErrorResponse | SuccessResponse | void> => {
        try {
          return await valuesService.getByCriteria(id)
        } catch (error) {
          console.log(error)
        }
      }
    )
    ipcMain.handle(
      'updateValues',
      async (_event, values: ToUpdateValues[]): Promise<void | SuccessResponse | ErrorResponse> => {
        try {
          return valuesService.updateValues(values)
        } catch (error) {
          console.log(error)
        }
      }
    )

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  } catch (error) {
    console.log(error)
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
