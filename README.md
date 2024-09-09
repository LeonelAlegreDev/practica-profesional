# Practica Profesional

## Preparar entorno de trabajo
### Instalar Angular
```bash
npm i -g @angular/cli
```

### Instalar Firebase Cli
```bash
npm i -g firebase-tools
```

### Instalar Ionic
```bash
npm i -g @ionic/cli
```

### Instalar JDK para compilar aplicaciones Android
#### Windows
Descarga el instalador desde https://www.oracle.com/java/technologies/downloads/

#### Linux
```bash
sudo apt install default-jdk
```

## Crear aplicación con Ionic
### Inicializar proyecto
```bash
ionic start my-app blank
```

### Instalar los paquetes de Firebase para Angular
```bash
npm install @angular/fire firebase
```

### Inicializar proyecto con firebase
```bash
firebase init
```

## Generar APK
### Configuración de entorno para aplicaciones Android
#### Descargar SDK 
1. Descargar el Paquete de herramientas del SDK desde la pagina oficial de Android
o https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip?hl=es-419

2. Descomprimir el archivo en la ruta C:\Users\USER_NAME\AppData\Android\SDK

3. Crear directorio dentro del directorio commandlinetools llamada "tools"
4. Mover todos los archivos del directorio commandlinetools la carpeta creada  "tools"

#### Generar 3 variables de entorno
C:\Users\USER_NAME\AppData\Android\SDK\cmdline-tools\tools\bin
C:\Users\User\AppData\Android\SDK\emulator
C:\Users\User\AppData\Android\SDK\platform-tools

#### Validar la instalación
```bash
sdkmanager --list
```

#### Instalar paquetes para Android 7.1.1
```bash
sdkmanager "build-tools;25.0.3"
sdkmanager "platforms;android-25"
sdkmanager "sources;android-25"
sdkmanager "system-images;android-25;android-wear;armeabi-v7a"
```

#### Configurar PATH
1. Crear direcotrio dentro de la carpeta android con el nombre local.properties
2. Pegar la ruta al SDK
```properties
sdk.dir=C:\\Users\\USERNAME\\AppData\\Android\\SDK
```

### Compilar aplicaicón
```bash
ionic build
```

### Agregar Android al proyecto
```bash
ionic capacitor add android
```

### Genera el APK
```bash
ionic capacitor copy android
cd android
.\gradlew assembleDebug
```
**Salida:** android/app/build/outputs/apk/debug/app-debug.apk

> **Nota:** En sistemas operativos Linux se debe remplazar '\' por '/'.