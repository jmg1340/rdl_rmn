# el certificat caduca en un any
# data generacio: 23/11/2016

openssl genrsa -out rmn-2016-key.pem 2048
openssl req -new -sha256 -key rmn-2016-key.pem -out rmn-2016-csr.pem
openssl x509 -req -in rmn-2016-csr.pem -signkey rmn-2016-key.pem -out rmn-2016-cert.pem
