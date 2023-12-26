import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { userService, criteriaService, valuesService } from './service/index.service'
import { NewCriteria } from './types/criterias.type'
import { FrontendNewUser } from './types/user.type'
import { ValueCreate } from './types/values.type'
import { ErrorResponse, SuccessResponse } from './types/response.type'

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
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  ipcMain.handle('createUser', (_event, user: FrontendNewUser) => userService.createUser(user))
  ipcMain.handle('getUsers', () => userService.getUsers())
  ipcMain.handle('getUser', (_event, idUser: string) => userService.getUserById(idUser))
  ipcMain.handle(
    'createCriteria',
    async (_event, values: NewCriteria): Promise<SuccessResponse | ErrorResponse> => {
      try {
        const res = await criteriaService.createCriteria(values)
        if ('payload' in res) {
          const criteriaId = JSON.parse(res.payload)
          const { idCriteria } = criteriaId
          const insertValues: ValueCreate[] = []
          for (let i = 1; i <= 5; i++) {
            insertValues.push({
              inGameValue: '',
              realValue: 0
            })
          }
          await valuesService.createValues(idCriteria, insertValues)
        }
        return res
      } catch (error) {
        return {
          code: 500,
          error: 'No se pudieron crear los valores'
        }
      }
    }
  )
  ipcMain.handle('getCriterias', () => criteriaService.getCriterias())
  ipcMain.handle('updateValues', (_event, id: number, values: ValueCreate[]) => {
    return valuesService.updateValues(id, values)
  })
  ipcMain.handle('getByCriteria', (_event, id: string) => {
    return valuesService.getByCriteria(id)
  })

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
