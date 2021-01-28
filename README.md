Instrukcja dla frontu (albo tu https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter):
- trzeba utworzyc plik keycloak.json (https://github.com/Ryniek/keycloak-react-client/blob/master/public/keycloak.json) z taka zawartoscia
- po kliknieciu w guzik logowania nastepuje przekierowanie, ziomek sie uwierzytelnia a na front zwracany jest obiekt Keycloak. (https://github.com/Ryniek/keycloak-react-client/blob/master/src/Secured.js) tutaj componentDidMount pokazuje jak to wyglada
- Jesli chcemy otrzymac token googlowski to wysylamy GETa na https://zagle-app-kejlok.herokuapp.com/auth/realms/zagle/broker/google/token  i w naglowki dajemy Bearer keycloak.token(to jest z tego obiektu Keycloak pole token). Otrzymamy obiekt w ktorym googlowskim tokenem bedzie pole AccessToken. Instrukcja(https://github.com/keycloak/keycloak-documentation/blob/master/server_development/topics/identity-brokering/tokens.adoc)
- Logout - GET na  https://zagle-app-kejlok.herokuapp.com/auth/realms/zagle/protocol/openid-connect/logout?id_token_hint=<<tutaj podajemy keycloak.idToken(z obiektu Keycloak zawartosc pola idToken)>>

Potrzebuje jeszcze adres url frontu na jaki mam przekierować użytkownika po poprawnym uwierzytelnieniu zeby ustawic w ustawieniach Keycloaka.
