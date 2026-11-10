---
id: practice-exam-questions
title: "Preguntas de Práctica Seleccionadas para el Examen PDE"
sidebar_label: "📝 Preguntas de Práctica para el Examen"
---

# Preguntas de Práctica Seleccionadas para el Examen PDE

Pon a prueba tu preparación con estas preguntas de escenario con nivel de examen que cubren los cinco dominios del blueprint. Cada pregunta incluye un análisis de por qué la opción correcta es el mejor patrón recomendado por Google y por qué fallan las demás opciones.

---

### Pregunta 1 (Dominio 1: Seguridad y Cumplimiento)
Un conglomerado internacional de investigación médica almacena datos de secuencias genómicas en Cloud Storage. Las leyes europeas de privacidad exigen que los datos genómicos de pacientes dentro de la Unión Europea nunca abandonen las fronteras físicas de la Unión Europea. Sin embargo, equipos de investigación globales con sede en Estados Unidos y Singapur requieren acceso de solo lectura para ejecutar consultas agregadas con BigQuery.

**¿Qué diseño impone la soberanía de los datos y a la vez permite el análisis global autorizado?**

- **A.** Almacenar todos los datos genómicos en un bucket multirregión `eu` de Cloud Storage. Crear una restricción de política de organización `constraints/gcp.resourceLocations` establecida en `in:eu-locations` para todos los recursos de almacenamiento y BigQuery. Usar BigQuery Omni para consultar los datos in situ desde datasets de la UE, proyectando solo estadísticas anonimizadas.
- **B.** Replicar todos los datos de la UE diariamente en un dataset de BigQuery en `us-central1` con enmascaramiento de columnas.
- **C.** Exportar los archivos genómicos de la UE a un servidor FTP on-premises y hacer que los analistas de EE. UU. accedan a él mediante VPN.
- **D.** Otorgar a los investigadores de EE. UU. el rol `roles/storage.admin` sobre los buckets de la UE.

> **Respuesta Correcta: A**  
> **Explicación**: La restricción de política de organización `constraints/gcp.resourceLocations` impone en la raíz de la organización que los recursos (buckets de GCS y datasets de BigQuery) solo puedan instanciarse físicamente dentro de la UE. Consultar el dataset de la UE localmente garantiza que los datos genómicos crudos subyacentes nunca salgan de los límites de la UE. Las opciones B, C y D violan las leyes de soberanía de datos.

---

### Pregunta 2 (Dominio 2: Ingesta y Procesamiento de Datos)
Una empresa de transporte por aplicación recibe ubicaciones GPS de conductores en tiempo real a través de Cloud Pub/Sub. El equipo de ingeniería de datos mantiene un pipeline de Apache Beam que se ejecuta en Cloud Dataflow para calcular mapas de densidad de conductores. Durante las horas pico de la mañana, las zonas sin cobertura de la red móvil hacen que los pings de GPS lleguen hasta 25 minutos después de que ocurriera la recogida real. El dashboard operativo debe actualizar las ubicaciones de los conductores en intervalos deslizantes de 5 minutos cada 1 minuto, y los pings de llegada tardía deben incluirse en los cálculos históricos en lugar de descartarse.

**¿Qué estrategia de ventanas y triggers debería implementar el equipo?**

- **A.** Ventana Fija (Tumbling) de 5 minutos con trigger de processing-time y cero allowed lateness.
- **B.** Ventana Deslizante de 5 minutos de duración con un deslizamiento de 1 minuto, watermarking basado en event-time y un allowed lateness de al menos 30 minutos con modo de acumulación.
- **C.** Ventanas de Sesión con una duración de gap de 5 minutos y modo de descarte (discarding).
- **D.** Ventana Global con un trigger after-each-element.

> **Respuesta Correcta: B**  
> **Explicación**: Las ventanas deslizantes (tamaño de 5 minutos, deslizamiento de 1 minuto) cumplen con la cadencia requerida. El watermarking basado en event-time combinado con un allowed lateness de 30 minutos garantiza que se capturen los registros móviles de llegada tardía (hasta 25 minutos tarde). El modo de acumulación garantiza que los cálculos de la ventana se vuelvan a emitir con conteos agregados actualizados cuando llegan registros tardíos.

---

### Pregunta 3 (Dominio 3: Almacenamiento de Datos)
Una plataforma de venta minorista en línea experimenta una severa sobrecarga de la base de datos durante el Black Friday. Su base de datos actual de catálogo de productos en MySQL está luchando por manejar 80,000 consultas de lectura por segundo para descripciones de productos y conteos de inventario. El equipo de ingeniería necesita introducir una capa de caché en memoria de latencia ultrabaja frente a la base de datos que proporcione tiempos de lectura de menos de un milisegundo con failover automatizado entre zonas.

**¿Qué servicio de Google Cloud cumple estos requisitos con una sobrecarga operativa mínima?**

- **A.** Cloud Bigtable con 10 nodos.
- **B.** Cloud Memorystore for Redis aprovisionado en el nivel High Availability (Standard).
- **C.** Cloud Spanner con configuración de una sola región.
- **D.** Cloud Firestore en modo Native.

> **Respuesta Correcta: B**  
> **Explicación**: **Cloud Memorystore for Redis** es un servicio de caché en memoria totalmente administrado que ofrece latencia de lectura y escritura de menos de un milisegundo. El nivel High Availability (Standard) aprovisiona una instancia primaria con una réplica de lectura entre zonas automatizada y failover automático en ~30 segundos, lo que lo hace ideal como capa de caché frente a MySQL.

---

### Pregunta 4 (Dominio 4: Análisis y Machine Learning)
Un servicio de streaming de medios quiere predecir si un cliente cancelará su suscripción mensual dentro de los próximos 30 días con base en su historial de visualización y sus tickets de soporte. Los datos residen en una tabla de BigQuery con 50 millones de registros históricos de usuarios. El equipo está formado por cinco analistas de datos competentes en SQL pero sin experiencia con Python, TensorFlow ni contenedores Docker.

**¿Cómo debería el equipo construir y evaluar este modelo predictivo?**

- **A.** Exportar la tabla a archivos CSV en GCS, aprovisionar un cluster de Dataproc y entrenar un modelo personalizado de Spark MLlib con Scala.
- **B.** Entrenar un modelo de clasificación binaria directamente en BigQuery con `CREATE OR REPLACE MODEL ... OPTIONS(model_type='BOOSTED_TREE_CLASSIFIER')` y evaluarlo con `ML.EVALUATE()`.
- **C.** Instalar PyTorch en una VM de Compute Engine con una GPU NVIDIA y entrenar un modelo manualmente.
- **D.** Usar Cloud Data Fusion para crear un pipeline personalizado de red neuronal.

> **Respuesta Correcta: B**  
> **Explicación**: **BigQuery ML (BQML)** permite a los analistas de SQL entrenar modelos avanzados de machine learning (como `BOOSTED_TREE_CLASSIFIER` o `LOGISTIC_REG`) directamente con SQL estándar, sin exportar datos ni administrar infraestructura de cómputo externa. Las métricas de rendimiento del modelo (ROC-AUC, Precision, Recall) se obtienen al instante con `ML.EVALUATE()`.

---

### Pregunta 5 (Dominio 5: Operaciones y Confiabilidad)
Una firma financiera ejecuta un DAG crítico de Cloud Composer cada mañana que extrae datos de Cloud Storage, los procesa en Dataproc y los carga en BigQuery. Una mañana, la tarea downstream de carga a BigQuery falla porque un socio upstream formateó los campos numéricos de moneda con signos de dólar (`$1,250.00`) en lugar de números sin formato. El equipo de datos corrige la regex de limpieza en el script de Dataproc y vuelve a ejecutar el pipeline. Sin embargo, después de la nueva ejecución, las consultas de reporting downstream muestran valores de transacción duplicados para ese día.

**¿Qué falla arquitectónica causó los datos duplicados y cómo debería resolverse?**

- **A.** La tarea de carga a BigQuery no era idempotente; configurar la disposición de escritura de BigQuery en `WRITE_TRUNCATE` para la partición diaria de destino o usar una sentencia SQL `MERGE`.
- **B.** Cloud Composer no pudo reiniciar su webserver.
- **C.** Los workers de Dataproc conservaron memoria en caché con datos sucios; reiniciar el nodo master.
- **D.** BigQuery Time Travel restauró automáticamente registros históricos duplicados.

> **Respuesta Correcta: A**  
> **Explicación**: La falta de diseño de un pipeline **idempotente** resultó en la duplicación de datos. Cuando una tarea de pipeline se reintenta después de una falla parcial o una corrección, si la disposición de escritura está configurada en `WRITE_APPEND` en lugar de `WRITE_TRUNCATE` (o si se usa un `INSERT` en lugar de un `MERGE` idempotente), los registros se insertan dos veces. Configurar `WRITE_TRUNCATE` garantiza que volver a ejecutar el job reemplace de forma segura el contenido de la partición sin duplicación.
