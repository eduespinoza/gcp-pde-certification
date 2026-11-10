---
id: master-cheat-sheet
title: "Hoja de Referencia Maestra y Matriz de Decisión para el Examen PDE"
sidebar_label: "📋 Hoja de Referencia Maestra"
---

# Hoja de Referencia Maestra y Matriz de Decisión para el Examen PDE

Esta hoja de referencia resume los árboles de decisión, las palabras clave, las cuotas y los comandos de CLI esenciales que necesitas memorizar antes de presentar el examen Google Cloud Professional Data Engineer.

---

## ⚡ El Selector de Servicios en 10 Segundos

Cuando leas una pregunta del examen, busca estas palabras clave distintivas:

| Si el escenario pide... | La respuesta es casi siempre... |
| :--- | :--- |
| **"Escrituras clave-valor de menos de 10 ms, telemetría de IoT, AdTech, >100k QPS, series temporales"** | **Cloud Bigtable** |
| **"Transacciones ACID globales, consenso síncrono multirregión, SLA de 99.999%"** | **Cloud Spanner** |
| **"Caché en memoria para dashboards de menos de un segundo para Looker / Looker Studio"** | **BigQuery BI Engine** |
| **"Change Data Capture (CDC) serverless en tiempo real desde Oracle / MySQL / Postgres"** | **Datastream** |
| **"Agregación de consultas precalculada con actualización incremental automática y reescritura transparente de consultas"**| **Materialized Views** |
| **"Pipeline unificado de streaming y batch, watermarks, datos de llegada tardía, exactly-once"** | **Cloud Dataflow (Apache Beam)** |
| **"Migración de jobs existentes de Spark, Hadoop, Presto, Hive con cambios mínimos de código"** | **Cloud Dataproc** |
| **"Lienzo visual de pipelines drag-and-drop sin código con más de 100 conectores"** | **Cloud Data Fusion** |
| **"Consultas entre nubes en AWS S3 o Azure Blob sin egreso de datos"** | **BigQuery Omni** |
| **"Tokenizar / enmascarar PII sensible como SSN, tarjetas de crédito o IDs de pacientes"** | **Cloud DLP (Sensitive Data Protection)** |
| **"Gobernanza descentralizada de Data Mesh, rastreo automatizado de esquemas, perfilado de datos"** | **Dataplex** |
| **"Compartición de datos zero-copy entre organizaciones externas con slots facturados al consumidor"** | **Analytics Hub** |
| **"Restaurar una tabla de BigQuery truncada accidentalmente hace 4 horas"** | **Time Travel (`FOR SYSTEM_TIME AS OF`)** |
| **"Capacidad de workers de Airflow agotada mientras se esperan archivos upstream"** | **Cambiar el Sensor a `mode="reschedule"`** |

---

## 🛠️ Referencia Esencial de Comandos de CLI

### 1. CLI de BigQuery (`bq`)
```bash
# Query with BATCH priority
bq query --use_legacy_sql=false --batch=true "SELECT * FROM \`proj.ds.tbl\`"

# Dry run to calculate bytes scanned without incurring cost
bq query --use_legacy_sql=false --dry_run "SELECT id, total FROM \`proj.ds.orders\` WHERE date >= '2026-01-01'"

# Create a partitioned and clustered table
bq mk --table \
  --schema "id:STRING,amount:FLOAT,ts:TIMESTAMP" \
  --time_partitioning_field ts \
  --clustering_fields id \
  my_dataset.orders_table

# Create a Table Snapshot
bq cp --snapshot my_dataset.orders backup_dataset.orders_snap_20261108
```

### 2. CLI de Google Cloud Storage (`gsutil` / `gcloud storage`)
```bash
# Fast parallel multi-threaded file copy
gcloud storage cp -r -m ./local_data gs://my-raw-lake-bucket/

# Apply a lifecycle management policy to a bucket
gcloud storage buckets update gs://my-raw-lake-bucket/ --lifecycle-file=lifecycle.json

# Enable versioning on a bucket (for object-level DR)
gcloud storage buckets update gs://my-raw-lake-bucket/ --versioning
```

### 3. CLI de Dataproc (`gcloud dataproc`)
```bash
# Create an ephemeral cluster with Spot/Preemptible secondary workers
gcloud dataproc clusters create my-ephemeral-cluster \
  --region=us-central1 \
  --master-machine-type=n2-standard-4 \
  --num-workers=2 \
  --worker-machine-type=n2-standard-4 \
  --num-secondary-workers=10 \
  --secondary-worker-type=spot \
  --bucket=my-cluster-staging-bucket

# Submit a Dataproc Serverless PySpark batch job (no cluster required!)
gcloud dataproc batches submit pyspark gs://my-code/spark_job.py \
  --region=us-central1 \
  --deps-bucket=gs://my-staging-bucket
```

---

## 📐 Cuotas Clave y Límites Arquitectónicos para Memorizar

1. **Particiones de Tabla de BigQuery**: Máximo de **10,000 particiones** por tabla.
2. **Columnas de Clustering de BigQuery**: Máximo de **4 columnas** por tabla.
3. **Ventana de Time Travel de BigQuery**: **2 a 7 días** (configurable; el valor predeterminado es 7 días).
4. **Capacidad Máxima de Almacenamiento de Cloud SQL**: **64 TB** por instancia.
5. **Almacenamiento por Nodo de Cloud Spanner**: Hasta **4 TB** por nodo de cómputo de Spanner.
6. **Polling de Sensores de Airflow**: Configura siempre `mode="reschedule"` para tareas que esperan $> 1$ minuto a fin de evitar el agotamiento de workers.
7. **Private Google Access**: Se requiere en subredes privadas siempre que instancias de cómputo sin direcciones IP externas accedan a GCS, BigQuery o Cloud KMS.
