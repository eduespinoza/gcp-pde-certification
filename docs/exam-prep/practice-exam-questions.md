---
id: practice-exam-questions
title: Curated PDE Practice Exam Questions
sidebar_label: 📝 Practice Exam Questions
---

# Curated PDE Practice Exam Questions

Test your readiness with these exam-caliber scenario questions covering all five blueprint domains. Each question includes an analysis of why the correct option is the best Google-recommended pattern and why the other options fail.

---

### Question 1 (Domain 1: Security & Compliance)
An international medical research conglomerate stores genomic sequence data in Cloud Storage. European privacy laws mandate that genomic data originating from patients within the European Union must never leave the European Union physical borders. However, global research teams based in the United States and Singapore require read-only access to run aggregate queries using BigQuery.

**Which design enforces data sovereignty while permitting authorized global analysis?**

- **A.** Store all genomic data in a multi-region `eu` Cloud Storage bucket. Create an organization policy constraint `constraints/gcp.resourceLocations` set to `in:eu-locations` for all storage and BigQuery resources. Use BigQuery Omni to query data in place from EU datasets, projecting only anonymized statistics.
- **B.** Replicate all EU data daily into a `us-central1` BigQuery dataset with column masking.
- **C.** Export EU genomic files to an on-premises FTP server and have US analysts access it via VPN.
- **D.** Grant US researchers the `roles/storage.admin` role on the EU buckets.

> **Correct Answer: A**  
> **Explanation**: The organization policy constraint `constraints/gcp.resourceLocations` enforces at the organizational root that resources (GCS buckets and BigQuery datasets) can physically only be instantiated within the EU. Querying the EU dataset locally ensures the underlying raw genomic data never egresses the EU boundary. Options B, C, and D violate data sovereignty laws.

---

### Question 2 (Domain 2: Ingesting & Processing Data)
A ride-hailing company receives real-time driver GPS locations via Cloud Pub/Sub. The data engineering team maintains an Apache Beam pipeline running on Cloud Dataflow to compute driver density maps. During morning rush hours, mobile network dead zones cause GPS pings to arrive up to 25 minutes after the actual pickup occurred. The operational dashboard must update driver locations in 5-minute sliding intervals every 1 minute, and late-arriving pings must be included in the historical calculations rather than dropped.

**Which windowing and trigger strategy should the team implement?**

- **A.** Tumbling window of 5 minutes with processing-time trigger and zero allowed lateness.
- **B.** Sliding window of 5-minute duration with a 1-minute slide, event-time watermarking, and an allowed lateness of at least 30 minutes with accumulation mode.
- **C.** Session windows with a gap duration of 5 minutes and discarding mode.
- **D.** Global window with an after-each-element trigger.

> **Correct Answer: B**  
> **Explanation**: Sliding windows (5-minute size, 1-minute slide) meet the cadence requirement. Event-time watermarking combined with an allowed lateness of 30 minutes ensures that late-arriving mobile records (up to 25 minutes late) are captured. Accumulation mode ensures that window calculations are re-emitted with updated aggregate counts when late records arrive.

---

### Question 3 (Domain 3: Storing Data)
An online retail platform experiences severe database strain during Black Friday. Their current product catalog database on MySQL is struggling to handle 80,000 read queries per second for product descriptions and inventory counts. The engineering team needs to introduce an ultra-low-latency in-memory caching tier in front of the database that provides sub-millisecond read times with automated cross-zone failover.

**Which Google Cloud service fulfills these requirements with minimal operational overhead?**

- **A.** Cloud Bigtable with 10 nodes.
- **B.** Cloud Memorystore for Redis provisioned in the High Availability (Standard) tier.
- **C.** Cloud Spanner with single-region configuration.
- **D.** Cloud Firestore in Native mode.

> **Correct Answer: B**  
> **Explanation**: **Cloud Memorystore for Redis** is a fully managed in-memory caching service delivering sub-millisecond read and write latency. The High Availability (Standard) tier provisions a primary instance with an automated cross-zone read replica and automatic failover in ~30 seconds, making it ideal as a caching tier in front of MySQL.

---

### Question 4 (Domain 4: Analysis & Machine Learning)
A media streaming service wants to predict whether a customer will cancel their monthly subscription within the next 30 days based on their viewing history and support tickets. The data resides in a BigQuery table with 50 million historical user records. The team consists of five data analysts who are proficient in SQL but have no experience with Python, TensorFlow, or Docker containers.

**How should the team build and evaluate this predictive model?**

- **A.** Export the table to CSV files in GCS, provision a Dataproc cluster, and train a custom Spark MLlib model using Scala.
- **B.** Train a binary classification model directly in BigQuery using `CREATE OR REPLACE MODEL ... OPTIONS(model_type='BOOSTED_TREE_CLASSIFIER')`, and evaluate it using `ML.EVALUATE()`.
- **C.** Install PyTorch on a Compute Engine VM with an NVIDIA GPU and train a model manually.
- **D.** Use Cloud Data Fusion to create a custom neural network pipeline.

> **Correct Answer: B**  
> **Explanation**: **BigQuery ML (BQML)** enables SQL analysts to train advanced machine learning models (such as `BOOSTED_TREE_CLASSIFIER` or `LOGISTIC_REG`) directly using standard SQL without exporting data or managing external compute infrastructure. Model performance metrics (ROC-AUC, Precision, Recall) are retrieved instantly using `ML.EVALUATE()`.

---

### Question 5 (Domain 5: Operations & Reliability)
A financial firm runs a mission-critical Cloud Composer DAG every morning that extracts data from Cloud Storage, processes it in Dataproc, and loads it into BigQuery. One morning, the downstream BigQuery load task fails because an upstream partner formatted numerical currency fields with dollar signs (`$1,250.00`) instead of raw numbers. The data team fixes the cleansing regex in the Dataproc script and re-runs the pipeline. However, after the re-run, downstream reporting queries show doubled transaction values for that day.

**What architectural flaw caused the duplicate data, and how should it be resolved?**

- **A.** The BigQuery load task was not idempotent; configure the BigQuery write disposition to `WRITE_TRUNCATE` for the target daily partition or use a SQL `MERGE` statement.
- **B.** Cloud Composer failed to restart its webserver.
- **C.** Dataproc workers retained dirty cached memory; restart the master node.
- **D.** BigQuery Time Travel automatically restored duplicate historical records.

> **Correct Answer: A**  
> **Explanation**: The failure to design an **idempotent** pipeline resulted in data duplication. When a pipeline task is retried after a partial failure or fix, if the write disposition is set to `WRITE_APPEND` instead of `WRITE_TRUNCATE` (or if an `INSERT` is used instead of an idempotent `MERGE`), records are inserted twice. Setting `WRITE_TRUNCATE` ensures that re-running the job safely replaces the partition's contents without duplication.
