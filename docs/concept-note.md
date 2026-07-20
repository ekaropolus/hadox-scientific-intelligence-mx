---
lang: es-MX
fontsize: 8pt
classoption: letterpaper
geometry: paper=letterpaper,top=1.15cm,bottom=1.15cm,left=1.30cm,right=1.30cm
header-includes:
  - |
    \usepackage{tikz}
    \usetikzlibrary{arrows.meta,positioning}
---

\thispagestyle{empty}
\sffamily

\noindent
\begin{minipage}[t]{0.18\textwidth}
\includegraphics[width=0.92\linewidth]{assets/hadox-research-labs-lockup.png}
\end{minipage}
\begin{minipage}[t]{0.55\textwidth}
{\LARGE\bfseries\color{HadoxBlack}Nota Conceptual\par}
\vspace{0.03cm}
{\large\color{HadoxGray}Inteligencia Científica Regional · México\par}
\vspace{0.03cm}
{\footnotesize\color{HadoxGray}Infraestructura abierta de evidencia para pasar de capacidad científica a decisiones revisables.\par}
\end{minipage}
\begin{minipage}[t]{0.25\textwidth}
\raggedleft
\footnotesize
\textbf{HADOX RESEARCH LABS}\\
Nota institucional v2.0\\
20 julio 2026\\
\href{https://hadox.org}{hadox.org}
\end{minipage}

\vspace*{0.06cm}
\textcolor{HadoxAccent}{\rule{\textwidth}{1.15pt}}
\vspace{0.06cm}

\begingroup\footnotesize
\begin{tabularx}{\textwidth}{@{}>{\sffamily\bfseries}l X >{\sffamily\bfseries}l X@{}}
Naturaleza & prototipo abierto de investigación e ingeniería & Ámbito inicial & capacidad científica y oportunidad regional en México \\
Usuarios previstos & equipos de desarrollo regional, investigación e innovación & Unidad de análisis & región, institución, línea de capacidad y paquete de ejecución \\
Activo público & contratos, configuraciones, servicios de referencia y método & No incluido & datos operativos, contactos, reportes privados, UI heredada y autenticación \\
\end{tabularx}
\endgroup

\vspace{0.03cm}

\begin{hadoxcallout}
\textbf{Tesis}\par
Una plataforma de inteligencia científica es útil cuando conserva la procedencia de cada señal, separa evidencia de inferencia y hace visible qué falta validar antes de convertir una hipótesis regional en producto, piloto, consorcio o decisión de inversión. El valor no está en un \emph{score} opaco: está en una cadena de evidencia que otra persona pueda revisar.
\end{hadoxcallout}

\vspace{0.03cm}

\begin{hadoxwarmcallout}
\textbf{Por qué existe esta nota}\par
El repositorio público conserva la parte propia y redistribuible del prototipo mexicano. Esta nota explica qué problema intenta resolver, qué componentes existen realmente en código, qué quedó fuera por privacidad, seguridad o licencia, y qué trabajo falta para convertir la referencia en un piloto verificable. No sustituye diligencia técnica, jurídica ni comercial.
\end{hadoxwarmcallout}

\vspace{0.04cm}

\noindent
\begin{minipage}[t]{0.485\textwidth}
\begin{hadoxcallout}
\textbf{Propuesta central}\par
Organizar evidencia regional en paquetes normalizados con manifiesto, tablas base y detalle, reglas de calidad y módulos de decisión. La salida debe conectar señales de mercado y ciencia con hipótesis de producto, rutas de maduración y tableros de 90 días.
\begin{itemize}
\item contratos de datos y módulos reutilizables;
\item procedencia, cobertura y método explícitos;
\item artefactos descargables para revisión;
\item intervención humana en toda decisión material.
\end{itemize}
\end{hadoxcallout}
\end{minipage}
\hfill
\begin{minipage}[t]{0.485\textwidth}
\begin{hadoxwarmcallout}
\textbf{Límite de la propuesta}\par
La versión abierta no es una aplicación lista para producción ni un producto de diligencia terminado. No distribuye los paquetes históricos de reportes, datos personales, listas de contacto, credenciales, bases operativas, la interfaz administrativa con licencia de terceros ni el antiguo código de autenticación. Un despliegue debe integrar identidad mantenida y datos con derechos verificados.
\end{hadoxwarmcallout}
\end{minipage}

\section{Cadena evidencia → decisión}

\begin{center}
\begin{tikzpicture}[
  node distance=2.3mm,
  stage/.style={draw=HadoxRule,fill=HadoxLight,rounded corners=1.3mm,minimum height=9mm,text width=3.05cm,align=center,font=\sffamily\scriptsize},
  gate/.style={draw=HadoxGold,fill=HadoxWarm,rounded corners=1.3mm,minimum height=9mm,text width=3.05cm,align=center,font=\sffamily\scriptsize\bfseries},
  flow/.style={-{Latex[length=1.7mm]},line width=.55pt,draw=HadoxAccent}
]
\node[stage] (s1) {Fuentes oficiales o licenciadas};
\node[stage,right=of s1] (s2) {Paquete regional normalizado};
\node[stage,right=of s2] (s3) {Ledger, calidad y cobertura};
\node[stage,right=of s3] (s4) {Módulos de análisis};
\node[gate,right=of s4] (s5) {Artefacto + revisión humana};
\draw[flow] (s1) -- (s2);
\draw[flow] (s2) -- (s3);
\draw[flow] (s3) -- (s4);
\draw[flow] (s4) -- (s5);
\end{tikzpicture}
\end{center}

\section{Módulos registrados en el código}

\begingroup\footnotesize
\begin{tabularx}{\textwidth}{@{}>{\sffamily\bfseries}p{0.19\textwidth} X X@{}}
Lectura de base & \textbf{Investment Dashboard}; \textbf{Market Intelligence}; \textbf{Science Capacity} & demanda, concentración territorial, instituciones, disciplinas, obras y cobertura de evidencia. \\
Traducción estratégica & \textbf{Product Lines}; \textbf{Roadmap}; \textbf{Priority Execution} & hipótesis de oferta, preparación, bandas de capital, hitos, riesgos, vehículos y secuencia de ejecución. \\
Entrega y validación & \textbf{Grounded Packages}; \textbf{90-Day Board}; \textbf{Pilot Clients} & paquetes respaldados por evidencia, puertas de decisión, responsables, cadencia y perfiles de piloto. \\
\end{tabularx}
\endgroup

\vfill
\begingroup
\scriptsize\color{HadoxGray}\textbf{Lectura correcta:} los nueve nombres son contratos y configuraciones de módulo presentes en el repositorio; no prueban por sí solos cobertura completa, calidad de datos ni validación comercial.
\par
\endgroup

\newpage
\thispagestyle{empty}

\begingroup
\noindent\small\sffamily\bfseries\color{HadoxBlack}INTELIGENCIA CIENTÍFICA REGIONAL · MÉXICO\hfill
\footnotesize\sffamily\mdseries\color{HadoxGray}Diseño técnico y estado de evidencia · 2/3
\par
\endgroup
\vspace{0.03cm}
\textcolor{HadoxAccent}{\rule{\textwidth}{0.8pt}}

\section{Arquitectura funcional de referencia}

\begingroup\footnotesize
\begin{tabularx}{\textwidth}{@{}>{\sffamily\bfseries}p{0.18\textwidth} X >{\sffamily\bfseries}p{0.17\textwidth} X@{}}
Entrada & fuentes públicas, oficiales o licenciadas; sus términos se verifican por separado & Ingesta & descarga, normalización, control de cambios y enriquecimiento documentado \\
Paquete regional & manifiesto, tablas núcleo, detalle, documentos y flujos & Método & plantillas de ledger, KPI derivado y reporte de calidad \\
Capa analítica & registro de regiones y plugins de módulo & Servicios & adaptadores de archivo/Postgres, auditoría y registro de reportes \\
Control de acceso & vocabulario RBAC de referencia; identidad fuera del repositorio & Salida & fichas, reportes, paquetes, rutas y tableros sujetos a revisión \\
\end{tabularx}
\endgroup

\begin{hadoxcallout}
\textbf{Separación deliberada}\par
El contrato reusable se mantiene separado de la evidencia específica de cada región. El registro de México contiene configuración para Morelos, Querétaro y Tlaxcala, incluidas rutas y tesis de referencia; los archivos de datos y reportes a los que esas rutas apuntaban no forman parte del repositorio público. Replicar el sistema en otra región exige reconstruir fuentes, cobertura, métodos y conclusiones.
\end{hadoxcallout}

\section{Ledger de evidencia y madurez}

\begingroup\scriptsize
\renewcommand{\arraystretch}{1.12}
\begin{tabularx}{\textwidth}{@{}>{\sffamily\bfseries}p{0.20\textwidth} p{0.13\textwidth} X X@{}}
\textbf{Elemento} & \textbf{Disponibilidad} & \textbf{Lo que demuestra} & \textbf{Límite / siguiente prueba} \\
Contratos de datos y módulos & incluido & estructura esperada de paquetes, campos, plugins y relación módulo-tabla & validar con paquetes sintéticos y pruebas automatizadas \\
Registro regional MX & incluido & configuración de Morelos, Querétaro y Tlaxcala y modos de cobertura declarados & no contiene la evidencia subyacente; no equivale a cobertura vigente \\
Servicios de referencia & incluidos & patrones para datos, Postgres, auditoría, reportes y almacenamiento de ejecución & no se presentan como servicios endurecidos ni despliegue certificado \\
Plantillas de gobernanza & incluidas & campos mínimos para fuentes, KPI derivados y calidad & falta aplicar el ledger a una muestra pública reproducible \\
Datos y reportes operativos & excluidos & la exclusión reduce exposición de datos personales, clientes y material licenciado & crear un paquete demostrador sintético o claramente redistribuible \\
UI y autenticación & excluidas & se evita redistribuir una plantilla comercial y un diseño de seguridad no avalado & integrar UI accesible e identidad mantenida con revisión independiente \\
Validación comercial & no establecida & el repositorio formula una superficie de investigación y contribución & definir usuario, decisión, criterio de éxito y piloto con evidencia \\
\end{tabularx}
\endgroup

\section{Reglas para que una conclusión sea utilizable}

\noindent
\begin{minipage}[t]{0.485\textwidth}
\begin{hadoxcallout}
\textbf{Cada fuente debe registrar}\par
\begin{itemize}
\item propietario, URL, fecha, versión y licencia;
\item método de extracción y transformación;
\item cobertura geográfica y temporal;
\item campos personales o sensibles;
\item restricciones de redistribución y uso.
\end{itemize}
\end{hadoxcallout}
\end{minipage}
\hfill
\begin{minipage}[t]{0.485\textwidth}
\begin{hadoxwarmcallout}
\textbf{Cada indicador derivado debe declarar}\par
\begin{itemize}
\item fórmula, pesos e insumos;
\item tratamiento de faltantes;
\item frontera de evidencia e incertidumbre;
\item responsable y estado de revisión;
\item interpretación permitida y no permitida.
\end{itemize}
\end{hadoxwarmcallout}
\end{minipage}

\section{Gobernanza mínima de decisión}

\begingroup\footnotesize
\begin{tabularx}{\textwidth}{@{}>{\sffamily\bfseries}p{0.19\textwidth} X X@{}}
Responsable de datos & aprueba fuente, licencia, transformación y actualización & puede bloquear una publicación por procedencia o privacidad \\
Responsable analítico & documenta método, faltantes, sensibilidad y confianza & no convierte correlación o disponibilidad en causalidad \\
Responsable de producto & define usuario, decisión, umbral y forma de entrega & separa exploración, piloto y afirmación comercial \\
Revisión independiente & reproduce muestra, cuestiona sesgo y registra disenso & antecede cualquier recomendación material o difusión pública \\
\end{tabularx}
\endgroup

\begin{hadoxwarmcallout}
\textbf{Regla de publicación}\par
Nombres de investigadores, correos, teléfonos, domicilios, contactos de empresas y cruces privados no deben entrar a una descarga pública salvo base jurídica, propósito y aprobación documentados. Cuando no exista esa certeza, usar identificadores anonimizados, categorías agregadas o datos sintéticos.
\end{hadoxwarmcallout}

\vfill
\begingroup
\scriptsize\color{HadoxGray}Fuentes externas mencionadas en los contratos —INEGI, SNII/SECIHTI, OpenAlex, ROR y portales gubernamentales— conservan sus propios términos. Su mención no implica que Hadox pueda relicenciarlas.
\par
\endgroup

\newpage
\thispagestyle{empty}

\begingroup
\noindent\small\sffamily\bfseries\color{HadoxBlack}INTELIGENCIA CIENTÍFICA REGIONAL · MÉXICO\hfill
\footnotesize\sffamily\mdseries\color{HadoxGray}Ruta de demostración abierta · 3/3
\par
\endgroup
\vspace{0.03cm}
\textcolor{HadoxAccent}{\rule{\textwidth}{0.8pt}}

\section{Ruta propuesta de 90 días}

\begingroup\footnotesize
\begin{tabularx}{\textwidth}{@{}>{\sffamily\bfseries}p{0.12\textwidth} X X >{\raggedright\arraybackslash}p{0.22\textwidth}@{}}
\textbf{Ventana} & \textbf{Construir} & \textbf{Validar} & \textbf{Puerta de salida} \\
0--30 & seleccionar una decisión concreta; crear paquete regional sintético o redistribuible; implementar validador del contrato y ledger & derechos de uso, campos obligatorios, cobertura, privacidad y reproducción local & paquete que otra persona pueda reconstruir sin secretos ni datos personales \\
31--60 & conectar una o dos fuentes oficiales; publicar método de indicadores; preparar UI accesible independiente e integración de identidad & cambios de fuente, faltantes, sesgo, permisos y trazabilidad de cada salida & un módulo completo que muestre fuente, método, descarga y límites \\
61--90 & operar un piloto acotado con revisión humana, auditoría de decisiones y tablero de aprendizaje & utilidad para el usuario definido, tasa de corrección, evidencia faltante, seguridad y costo operativo & decisión documentada: iterar, ampliar o detener; sin prometer escala antes de la prueba \\
\end{tabularx}
\endgroup

\section{Entregable de referencia al día 90}

\begin{hadoxcallout}
Un demostrador responsable no necesita fingir cobertura nacional. Debe mostrar una región, una pregunta de decisión y un flujo completo: fuente autorizada → transformación reproducible → indicador documentado → módulo visible → descarga de evidencia → revisión humana → registro de decisión. El éxito es que un tercero pueda explicar de dónde salió la recomendación y qué dato podría cambiarla.
\end{hadoxcallout}

\section{Contribución abierta y licencia}

\noindent
\begin{minipage}[t]{0.485\textwidth}
\begin{hadoxcallout}
\textbf{Qué se puede mejorar}\par
\begin{itemize}
\item adaptadores de fuentes oficiales mexicanas;
\item validadores y pruebas de reproducibilidad;
\item métricas de confianza, sesgo e incertidumbre;
\item UI accesible sin dependencias heredadas;
\item resolución de entidades con privacidad;
\item benchmarks para recomendaciones regionales.
\end{itemize}
\end{hadoxcallout}
\end{minipage}
\hfill
\begin{minipage}[t]{0.485\textwidth}
\begin{hadoxwarmcallout}
\textbf{Condiciones}\par
El material propio de Hadox en esta exportación limpia se publica bajo \textbf{Apache License 2.0}. La licencia no cubre datasets externos, marcas ni componentes de terceros. Toda contribución debe usar datos sintéticos o de redistribución comprobada y excluir credenciales, contactos personales y material de clientes.
\end{hadoxwarmcallout}
\end{minipage}

\section{Siguiente paso recomendado}

\begin{hadoxwarmcallout}
\textbf{Abrir una primera especificación verificable, no una expansión de alcance.}\par
Elegir una región y una sola decisión —por ejemplo, evaluar si existe evidencia suficiente para diseñar un piloto ciencia--industria en una línea concreta—; nombrar responsable de datos, responsable analítico y revisor; fijar fuentes permitidas y criterio de salida; construir el paquete abierto; y registrar como \emph{no concluyente} cualquier afirmación que no cruce la puerta de evidencia.
\end{hadoxwarmcallout}

\section{Fuentes del concepto y enlaces}

\begingroup\footnotesize
\begin{tabularx}{\textwidth}{@{}>{\sffamily\bfseries}p{0.20\textwidth} X@{}}
Código abierto & \href{https://github.com/ekaropolus/hadox-scientific-intelligence-mx}{github.com/ekaropolus/hadox-scientific-intelligence-mx} \\
Incidencias y propuestas & \href{https://github.com/ekaropolus/hadox-scientific-intelligence-mx/issues}{github.com/ekaropolus/hadox-scientific-intelligence-mx/issues} \\
Contrato de datos & \href{https://github.com/ekaropolus/hadox-scientific-intelligence-mx/blob/main/docs/platform/country-platform-data-contract.md}{docs/platform/country-platform-data-contract.md} \\
Contrato de módulos & \href{https://github.com/ekaropolus/hadox-scientific-intelligence-mx/blob/main/docs/platform/module-plugin-contract.md}{docs/platform/module-plugin-contract.md} \\
Manifiesto del open core & \href{https://github.com/ekaropolus/hadox-scientific-intelligence-mx/blob/main/OPEN_CORE_MANIFEST.md}{OPEN\_CORE\_MANIFEST.md} \\
Términos de datos & \href{https://github.com/ekaropolus/hadox-scientific-intelligence-mx/blob/main/DATA_LICENSES.md}{DATA\_LICENSES.md} \\
Contribuir / licencia & \href{https://github.com/ekaropolus/hadox-scientific-intelligence-mx/blob/main/CONTRIBUTING.md}{CONTRIBUTING.md} · \href{https://github.com/ekaropolus/hadox-scientific-intelligence-mx/blob/main/LICENSE}{Apache-2.0} \\
Página del proyecto & \href{https://hadox.org/work/mexico-scientific-intelligence}{hadox.org/work/mexico-scientific-intelligence} \\
\end{tabularx}
\endgroup

\vfill
\textcolor{HadoxAccent}{\rule{\textwidth}{0.9pt}}
\vspace{0.04cm}

\noindent
\begingroup
\scriptsize\color{HadoxGray}\textbf{Contacto:} Hadox Research Labs · \href{https://hadox.org}{hadox.org} \hfill Esta nota describe el estado público del repositorio al 20 de julio de 2026.
\par
\endgroup
