/**
 * ========================================
 * GOOGLE APPS SCRIPT - API BACKEND (Code.js)
 * ========================================
 * Este script actúa como intermediario entre el frontend de Finance Billy
 * y la hoja de Google Sheets (pestaña 'users').
 */

// Nombre de la pestaña de la hoja de cálculo donde se almacenan los usuarios
const SHEET_NAME = "users";

/**
 * Maneja solicitudes GET (opcional para pruebas de conectividad rápida).
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "success", message: "API de Finance Billy funcionando correctamente." }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Maneja solicitudes POST procedentes de la aplicación web mediante fetch().
 * Recibe un objeto JSON con la acción solicitada ("register" o "login").
 */
function doPost(e) {
  try {
    // Analizar los datos JSON enviados desde el frontend
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    // Si la pestaña no existe, la creamos automáticamente con sus encabezados
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["ID", "Password", "Nombre", "Apellido", "Email"]);
    }
    
    // ========================================
    // ACCIÓN: REGISTRO DE NUEVO USUARIO
    // ========================================
    if (action === "register") {
      var userId = String(data.user).trim();
      var password = String(data.password);
      var name = String(data.name).trim();
      var lastName = String(data.lastName).trim();
      var email = String(data.email).trim();
      
      var rows = sheet.getDataRange().getValues();
      
      // Comprobar si el usuario ya existe (Columna 1, índice 0)
      for (var i = 1; i < rows.length; i++) {
        if (String(rows[i][0]).toLowerCase() === userId.toLowerCase()) {
          return createJsonResponse({ status: "exists", message: "El usuario ya existe." });
        }
      }
      
      // Si no existe, agregamos la nueva fila a la hoja
      sheet.appendRow([userId, password, name, lastName, email]);
      return createJsonResponse({ status: "success", message: "Registro completado con éxito." });
    }
    
    // ========================================
    // ACCIÓN: INICIO DE SESIÓN (LOGIN)
    // ========================================
    if (action === "login") {
      var userId = String(data.user).trim();
      var password = String(data.password);
      
      var rows = sheet.getDataRange().getValues();
      var userFound = false;
      var storedPassword = "";
      var userName = "";
      
      // Buscar usuario en la hoja de cálculo
      for (var i = 1; i < rows.length; i++) {
        if (String(rows[i][0]).toLowerCase() === userId.toLowerCase()) {
          userFound = true;
          storedPassword = String(rows[i][1]);
          userName = String(rows[i][2]);
          break;
        }
      }
      
      if (!userFound) {
        return createJsonResponse({ status: "not_found", message: "El usuario no existe." });
      }
      
      if (storedPassword !== password) {
        return createJsonResponse({ status: "wrong_password", message: "Contraseña incorrecta." });
      }
      
      return createJsonResponse({ status: "success", message: "Login exitoso.", name: userName });
    }
    
    return createJsonResponse({ status: "error", message: "Acción no válida." });
    
  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

/**
 * Función auxiliar para devolver respuestas en formato JSON con cabeceras CORS adecuadas.
 */
function createJsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
