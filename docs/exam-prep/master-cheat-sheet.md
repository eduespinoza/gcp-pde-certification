---
id: master-cheat-sheet
title: Master PDE Exam Cheat Sheet & Decision Matrix
sidebar_label: 📋 Master Cheat Sheet
---

# Master PDE Exam Cheat Sheet & Decision Matrix

This cheat sheet summarizes the essential decision trees, keywords, quotas, and CLI commands you need to memorize before sitting for the Google Cloud Professional Data Engineer exam.

---

## ⚡ The 10-Second Service Matcher

When reading an exam question, scan for these signature keywords:

| If the scenario asks for... | The answer is almost always... |
| :--- | :--- |
| **"Sub-10ms key-value writes, IoT telemetry, AdTech, >100k QPS, time series"** | **Cloud Bigtable** |
| **"Global ACID transactions, multi-region synchronous consensus, 99.999% SLA"** | **Cloud Spanner** |
| **"Sub-second in-memory dashboard caching for Looker / Looker Studio"** | **BigQuery BI Engine** |
| **"Serverless real-time Change Data Capture (CDC) from Oracle / MySQL / Postgres"** | **Datastream** |
| **"Precomputed query aggregation with automatic incremental refresh and transparent query rewrite"**| **Materialized Views** |
| **"Unified streaming and batch pipeline, watermarks, late-arriving data, exactly-once"** | **Cloud Dataflow (Apache Beam)** |
| **"Migrating existing Spark, Hadoop, Presto, Hive jobs with minimal code changes"** | **Cloud Dataproc** |
| **"No-code visual drag-and-drop pipeline canvas with 100+ connectors"** | **Cloud Data Fusion** |
| **"Cross-cloud querying on AWS S3 or Azure Blob without data egress"** | **BigQuery Omni** |
| **"Tokenize / mask sensitive PII like SSN, Credit Cards, or Patient IDs"** | **Cloud DLP (Sensitive Data Protection)** |
| **"Decentralized Data Mesh governance, automated schema crawling, data profiling"** | **Dataplex** |
| **"Zero-copy data sharing across external organizations with consumer-billed slots"** | **Analytics Hub** |
| **"Restoring an accidentally truncated BigQuery table from 4 hours ago"** | **Time Travel (`FOR SYSTEM_TIME AS OF`)** |
| **"Airflow worker capacity exhausted while waiting for upstream files"** | **Switch Sensor to `mode="reschedule"`** |

---

## 🛠️ Essential CLI Commands Reference

### 1. BigQuery CLI (`bq`)
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

### 2. Google Cloud Storage CLI (`gsutil` / `gcloud storage`)
```bash
# Fast parallel multi-threaded file copy
gcloud storage cp -r -m ./local_data gs://my-raw-lake-bucket/

# Apply a lifecycle management policy to a bucket
gcloud storage buckets update gs://my-raw-lake-bucket/ --lifecycle-file=lifecycle.json

# Enable versioning on a bucket (for object-level DR)
gcloud storage buckets update gs://my-raw-lake-bucket/ --versioning
```

### 3. Dataproc CLI (`gcloud dataproc`)
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

## 📐 Key Quotas & Architectural Limits to Memorize

1. **BigQuery Table Partitions**: Maximum of **10,000 partitions** per table.
2. **BigQuery Clustering Columns**: Maximum of **4 columns** per table.
3. **BigQuery Time Travel Window**: **2 to 7 days** (configurable; default is 7 days).
4. **Cloud SQL Maximum Storage Capacity**: **64 TB** per instance.
5. **Cloud Spanner Node Storage**: Up to **4 TB** per Spanner compute node.
6. **Airflow Sensor Polling**: Always configure `mode="reschedule"` for tasks waiting $> 1$ minute to prevent worker starvation.
7. **Private Google Access**: Required on private subnets whenever compute instances without external IP addresses access GCS, BigQuery, or Cloud KMS.
