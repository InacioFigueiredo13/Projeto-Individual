CREATE DATABASE bdDorifto;
USE bdDorifto;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    apelido VARCHAR(20) UNIQUE,
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(45)
);


CREATE TABLE evento(
	idEvento INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(50),
    bandeiraPais VARCHAR(150),
    logoEvento VARCHAR(150),
    localizacao VARCHAR(45),
    data DATE
);

CREATE TABLE usuarioAgenda(
	idAgenda INT AUTO_INCREMENT,
    fkUsuario INT,
    fkEvento INT,
    CONSTRAINT referenciaUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT referenciaEvento FOREIGN KEY (fkEvento) REFERENCES evento(idEvento),
    CONSTRAINT usuarioAgendaPK PRIMARY KEY (idAgenda, fkUsuario, fkEvento)
);

CREATE TABLE carroFabricante(
	idCarroFabricante INT PRIMARY KEY AUTO_INCREMENT,
    nomeCarroFabricante VARCHAR(55)
);

CREATE TABLE rankingCarrosFabricante(
	idRankingCarFab INT AUTO_INCREMENT,
    qtdPontos INT,
    posicao INT,
    fkCarroFabricante INT,
    CONSTRAINT carroFabricanteReferencia FOREIGN KEY (fkCarroFabricante) REFERENCES carroFabricante(idCarroFabricante),
    CONSTRAINT pkRankingCarsFab PRIMARY KEY (idRankingCarFab, fkCarroFabricante)
);

CREATE TABLE pneuFabricante(
	idPneuFabricante INT PRIMARY KEY AUTO_INCREMENT,
    nomePneuFabricante VARCHAR(55)
);

CREATE TABLE rankingPneusFabricante(
	idRankingPneuFab INT AUTO_INCREMENT,
    qtdPontos INT,
    posicao INT,
    fkPneuFabricante INT,
    CONSTRAINT pneuFabricanteReferencia FOREIGN KEY (fkPneuFabricante) REFERENCES pneuFabricante(idPneuFabricante),
    CONSTRAINT pkRakingPneuFab PRIMARY KEY (idRankingPneuFab, fkPneuFabricante)
);

CREATE TABLE piloto(
	idPiloto INT AUTO_INCREMENT,
    nomeSobrenome VARCHAR(55),
    fotoPiloto VARCHAR(150),
    nacionalidadeBandeira VARCHAR(150),
    idade INT,
    nomeTime VARCHAR(55),
    fkCarroFabricante INT,
    fkPneuFabricante INT,
    CONSTRAINT fkCarroFab FOREIGN KEY (fkCarroFabricante) REFERENCES carroFabricante(idCarroFabricante),
    CONSTRAINT fkPneuFab FOREIGN KEY (fkPneuFabricante) REFERENCES pneuFabricante(idPneuFabricante),
    CONSTRAINT pkPiloto PRIMARY KEY (idPiloto, fkCarroFabricante, fkPneuFabricante)
);

CREATE TABLE rankingPilotos(
	idRankingPiloto INT AUTO_INCREMENT,
    posicao INT,
    qtdPontos INT,
    fkPiloto INT,
    CONSTRAINT fkPilotoReferencia FOREIGN KEY (fkPiloto) REFERENCES piloto(idPiloto),
    CONSTRAINT pkRankingPilotos PRIMARY KEY (idRankingPiloto, fkPiloto)
);

CREATE TABLE listaGostei(
	idGostei INT AUTO_INCREMENT,
    fkPiloto INT,
    fkUsuario INT,
    CONSTRAINT fkPilotoRef FOREIGN KEY (fkPiloto) REFERENCES piloto(idPiloto),
    CONSTRAINT fkUsuarioRef FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT pkListaGostei PRIMARY KEY (idGostei, fkPiloto, fkUsuario)
);


INSERT INTO evento(descricao, bandeiraPais, logoEvento, localizacao, data) VALUES 
	("ROUND 4: THE GAUNTLET", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", "https://www.formulad.com/images/assets/logo.svg", "ENGLISHTOWN, NEW JERSEY, USA", "2023-06-22"),
    ("ROUND 5: CROSSROADS", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", "https://www.formulad.com/images/assets/logo.svg", "ST. LOUIS, MISSOURI, USA", "2023-07-13"),
    ("ROUND 6: THROWDOWN", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", "https://www.formulad.com/images/assets/logo.svg", "SEATTLE, WASHINGTON, USA", "2023-08-11"),
	("ROUND 7: ELEVATED", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", "https://www.formulad.com/images/assets/logo.svg", "GRANTSVILLE, UTAH, USA", "2023-09-14"),
    ("ROUND 8: TITLE FIGHT", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", "https://www.formulad.com/images/assets/logo.svg", "IRWINDALE, CALIFORNIA, USA", "2023-10-13"),
    ("ROUND 2 2023", "https://www.countryflags.com/wp-content/uploads/sweden-flag-png-large.png", "https://driftmasters.gp/wp-content/uploads/2019/09/DMGP-Logo-28.png", "DRIVECENTER ARENA, SWEDEN", "2023-06-09"),
    ("ROUND 3 2023", "https://www.countryflags.com/wp-content/uploads/finland-flag-png-large.png", "https://driftmasters.gp/wp-content/uploads/2019/09/DMGP-Logo-28.png", "POWER PARK HUVIVALTIO, FINLAND", "2023-07-07"),
    ("ROUND 4 2023", "https://www.countryflags.com/wp-content/uploads/latvia-flag-png-large.png", "https://driftmasters.gp/wp-content/uploads/2019/09/DMGP-Logo-28.png", "RIGA, LATVIA", "2023-07-29"),
    ("ROUND 5 2023", "https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png", "https://driftmasters.gp/wp-content/uploads/2019/09/DMGP-Logo-28.png", "FERROPOLIS, GERMANY", "2023-08-17"),
    ("ROUND 6 2023", "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png", "https://driftmasters.gp/wp-content/uploads/2019/09/DMGP-Logo-28.png", "PGE NARODOWY, WARSAW, POLAND", "2023-09-15"),
    ("7ª Etapa Ultimate Drift", "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png", "https://ultimatedrift.com.br/wp-content/uploads/2021/03/UD600.png", "PENHA, SC, BRAZIL", "2023-09-23"),
    ("8ª e 9ª Etapas Ultimate Drift", "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png", "https://ultimatedrift.com.br/wp-content/uploads/2021/03/UD600.png", "RIBEIRÃO PRETO, SP, BRAZIL", "2023-11-18");


INSERT INTO carroFabricante(nomeCarroFabricante) VALUES
	("Toyota"),
    ("Ford"),
    ("Chevrolet"),
    ("Nissan"),
    ("BMW");
    
INSERT pneuFabricante(nomePneuFabricante) VALUES
	("Nitto"),
    ("GT Radial"),
    ("Vitour"),
    ("Kenda");
    
INSERT INTO rankingCarrosFabricante(qtdPontos, posicao, fkCarroFabricante) VALUES
	(423, 3, 1),
    (432, 2, 2),
    (180, 5, 3),
    (567, 1, 4),
    (376, 4, 5);
    
    SELECT * FROM rankingCarrosFabricante 
		JOIN carroFabricante ON rankingCarrosFabricante.fkCarroFabricante = carroFabricante.idCarroFabricante
        ORDER BY posicao;

INSERT INTO rankingPneusFabricante(qtdPontos, posicao, fkPneuFabricante) VALUES
	(746, 2, 1),
    (774, 1, 2),
    (344, 3, 3),
    (114, 4, 4);
    
     SELECT * FROM rankingPneusFabricante 
		JOIN pneuFabricante ON rankingPneusFabricante.fkPneuFabricante = pneuFabricante.idPneuFabricante
        ORDER BY posicao;


INSERT INTO piloto(nomeSobrenome, fotoPiloto, nacionalidadeBandeira, idade, nomeTime, fkCarroFabricante, fkPneuFabricante) VALUES 
	("FREDRIC AASBO", "https://www.formulad.com/storage/drivers/FredricAasbo-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png", 37, "Papadakis Racing", 1, 1),
    ("CHELSEA DENOFA", "https://www.formulad.com/storage/drivers/ChelseaDenofa-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 34, "RTR Motorsports", 2, 1),
    ("MATT FIELD", "https://www.formulad.com/storage/drivers/MattField-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 33, "Drift Cave Motorsports", 3, 2),
    ("JAMES DEANE", "https://www.formulad.com/storage/drivers/JamesDeane-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/ireland-flag-png-large.png", 31, "RTR Motorsports", 2, 1),
    ("CHRIS FORSBERG", "https://www.formulad.com/storage/drivers/ChrisForsberg-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 40, "Forsberg Racing", 4, 2),
    ("DYLAN HUGHES", "https://www.formulad.com/storage/drivers/DylanHughes-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 31, "_Whip._", 5, 2),
    ("JONATHAN HURST", "https://www.formulad.com/storage/drivers/JonathanHurst-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 29, "Cash Racing", 5, 3),
    ("AURIMAS BAKCHIS", "https://www.formulad.com/storage/drivers/AurimasBakchis-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/lithuania-flag-png-large.png", 39, "Feal Suspension Race Team", 4, 2),
    ("ROME CHARPENTIER", "https://www.formulad.com/storage/drivers/RomeCharpentier-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 37, "Garagistic Racing", 5, 3),
    ("RYAN TUERCK", "https://www.formulad.com/storage/drivers/RyanTuerck-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 38, "Papadakis Racing", 1, 1),
    ("FORREST WANG", "https://www.formulad.com/storage/drivers/ForrestWang-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 40, "Get Nuts Lab", 4, 4),
    ("KAZUYA TAGUCHI", "https://www.formulad.com/storage/drivers/KazuyaTaguchi-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/japan-flag-png-large.png", 30, "Jerry Yang Racing", 1, 2),
    ("VAUGHN GITTIN JR", "https://www.formulad.com/storage/drivers/VaughnGittinJr-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 42, "RTR Motorsports", 2, 1),
    ("SIMEN OLSEN", "https://www.formulad.com/storage/drivers/SimenOlsen-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png", 26, "Feal Suspension Race Team", 4, 2),
    ("DANIEL STUKE", "https://www.formulad.com/storage/drivers/DanielStuke-portrait_banner2.png", "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", 28, "Mspek Performance", 4, 3);


INSERT INTO rankingPilotos(posicao, qtdPontos, fkPiloto) VALUES 
	(1, 196, 1),
    (2, 183, 2),
    (3, 180, 3),
    (4, 146, 4),
    (5, 136, 5),
    (6, 128, 6),
    (7, 128, 7),
    (8, 125, 8),
    (9, 120, 9),
    (10, 118, 10),
    (11, 114, 11),
    (12, 109, 12),
    (13, 103, 13),
    (14, 96, 14),
    (15, 96, 15);
        
CREATE USER 'backend_dorifto'@'localhost' IDENTIFIED BY 'prjDorifto12';
GRANT INSERT, SELECT, DELETE, UPDATE ON bdDorifto.* TO 'backend_dorifto'@'localhost';
flush privileges; 