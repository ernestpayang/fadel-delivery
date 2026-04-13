import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiClient {
  // L'URL de base. En développement, utilise 10.0.2.2 pour l'émulateur Android.
  // Tu pourras plus tard charger cela depuis un fichier .env
  static const String baseUrl = "http://10.0.2.2"; 

  // Headers par défaut (équivalent à ta configuration Axios)
  static Map<String, String> get _headers => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Méthode pour tester la route /health (Tâche 3 de ta liste)
  static Future<Map<String, dynamic>> checkHealth() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/health'),
        headers: _headers,
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {'status': 'DOWN', 'message': 'Serveur injoignable'};
      }
    } catch (e) {
      return {'status': 'ERROR', 'details': e.toString()};
    }
  }

  // Méthode générique pour les requêtes POST (Tâche 4)
  static Future<http.Response> post(String endpoint, Map<String, dynamic> data) async {
    return await http.post(
      Uri.parse('$baseUrl$endpoint'),
      headers: _headers,
      body: jsonEncode(data),
    );
  }
}