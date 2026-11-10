import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

const translations = {
  en: {
    layoutTitle: 'GCP Professional Data Engineer Study Guide',
    layoutDesc: 'Comprehensive preparation curriculum for the Google Cloud Certified Professional Data Engineer certification exam.',
    badge: 'Official Exam Blueprint 1:1 Coverage',
    heroTitle: 'Google Cloud Professional Data Engineer',
    heroSubtitle: 'The definitive master curriculum, architecture blueprints, SQL/Beam code patterns, decision trees, and scenario practice exams designed to get you certified.',
    startBtn: '🚀 Start Full Curriculum',
    cheatBtn: '📋 Master Cheat Sheet',
    practiceBtn: '📝 Practice Exam',
    modulesHeading: 'Curriculum Modules (100% Exam Guide Mapping)',
    modulesDesc: 'Each module includes in-depth conceptual architecture, service mechanics, code snippets, decision matrices, and practice scenarios with complete explanations.',
    lessonsLabel: 'Lessons',
    studyBtn: 'Study Module →',
    principlesHeading: '🧠 The 5 Core Principles of the PDE Exam',
    principle1: 'Managed & Serverless First',
    principle1Desc: 'Always prefer Dataflow, BigQuery, and Datastream over self-hosted compute clusters unless legacy code demands Dataproc.',
    principle2: 'Decouple Storage and Compute',
    principle2Desc: 'Never persist mission-critical data on worker local disks; leverage Cloud Storage, BigQuery, or Bigtable as external decoupled tiers.',
    principle3: 'Denormalize in BigQuery',
    principle3Desc: 'Replace multi-table SQL joins with RECORD (STRUCT) and REPEATED (ARRAY) fields to eliminate distributed shuffle bottlenecks.',
    principle4: 'Security by Design',
    principle4Desc: 'Enforce Least Privilege IAM, Customer-Managed Keys (CMEK) via Cloud KMS, and Sensitive Data Protection (DLP) tokenization for PII.',
    principle5: 'Event-Driven Scalability',
    principle5Desc: 'Pair Cloud Pub/Sub with Cloud Dataflow using event-time watermarking and allowed lateness for out-of-order streams.',
    ctaBtn: 'Begin with Section 1: Designing Data Processing Systems →',
    modules: [
      {
        title: 'Module 1: Designing Data Processing Systems',
        weight: '~22% of Exam',
        badge: 'Section 1',
        description: 'IAM, Org Policies, Cloud KMS, CMEK/CSEK, Cloud DLP, Data Sovereignty, ACID compliance, Dataform, and Data Migrations (DTS, DMS, Datastream).',
        link: '/docs/module-1-designing-systems/security-and-compliance',
        lessons: 4,
      },
      {
        title: 'Module 2: Ingesting & Processing Data',
        weight: '~25% of Exam',
        badge: 'Section 2',
        description: 'Pipeline planning, Dataflow vs Dataproc vs BigQuery vs Fusion vs Pub/Sub, Beam streaming mechanics, windowing, watermarks, triggers, AI enrichment, and CI/CD.',
        link: '/docs/module-2-ingesting-processing/planning-data-pipelines',
        lessons: 3,
      },
      {
        title: 'Module 3: Storing the Data',
        weight: '~20% of Exam',
        badge: 'Section 3',
        description: 'Storage selection matrix (BigQuery, Bigtable, Spanner, Cloud SQL, AlloyDB, GCS, Firestore), data warehousing, partitioning, clustering, BigLake, and Dataplex Data Mesh.',
        link: '/docs/module-3-storing-data/selecting-storage-systems',
        lessons: 4,
      },
      {
        title: 'Module 4: Analysis, BI, & Machine Learning',
        weight: '~15% of Exam',
        badge: 'Section 4',
        description: 'BI Engine, Materialized Views, Query Execution Graph debugging, Column & Row-level security, BigQuery ML algorithms, Vector Search & RAG, and Analytics Hub.',
        link: '/docs/module-4-analysis-and-ml/visualization-and-bi',
        lessons: 3,
      },
      {
        title: 'Module 5: Operations, Reliability, & Optimization',
        weight: '~18% of Exam',
        badge: 'Section 5',
        description: 'Dataproc cost optimization (Spot VMs), Cloud Composer / Airflow 2 DAG design, BigQuery Editions & Reservations, INFORMATION_SCHEMA debugging, and Disaster Recovery.',
        link: '/docs/module-5-operations-and-reliability/resource-optimization',
        lessons: 5,
      },
      {
        title: 'Exam Toolkit & Practice Questions',
        weight: 'Full Simulation',
        badge: 'Exam Prep',
        description: 'Comprehensive 10-second service matcher, CLI cheat sheet (bq, gcloud, gsutil), architectural quotas, and scenario practice exams with detailed answer rationale.',
        link: '/docs/exam-prep/master-cheat-sheet',
        lessons: 2,
      },
    ],
  },
  es: {
    layoutTitle: 'Guía de Estudio GCP Professional Data Engineer',
    layoutDesc: 'Currículo integral de preparación para el examen de certificación Google Cloud Professional Data Engineer.',
    badge: 'Cobertura 1:1 del Temario Oficial del Examen',
    heroTitle: 'Google Cloud Professional Data Engineer',
    heroSubtitle: 'El currículo maestro definitivo: planos de arquitectura, patrones de código SQL/Beam, árboles de decisión y exámenes de práctica con escenarios diseñados para que obtengas tu certificación.',
    startBtn: '🚀 Comenzar el Currículo Completo',
    cheatBtn: '📋 Hoja de Referencia Maestra',
    practiceBtn: '📝 Examen de Práctica',
    modulesHeading: 'Módulos del Currículo (100% Mapeo de la Guía del Examen)',
    modulesDesc: 'Cada módulo incluye arquitectura conceptual en profundidad, mecánicas de servicios, fragmentos de código, matrices de decisión y escenarios de práctica con explicaciones completas.',
    lessonsLabel: 'Lecciones',
    studyBtn: 'Estudiar Módulo →',
    principlesHeading: '🧠 Los 5 Principios Fundamentales del Examen PDE',
    principle1: 'Administrado y Serverless Primero',
    principle1Desc: 'Siempre prefiere Dataflow, BigQuery y Datastream sobre clusters de cómputo auto-gestionados, a menos que código legacy requiera Dataproc.',
    principle2: 'Desacoplar Almacenamiento y Cómputo',
    principle2Desc: 'Nunca persistas datos críticos en discos locales de los workers; usa Cloud Storage, BigQuery o Bigtable como capas de almacenamiento desacopladas.',
    principle3: 'Desnormalizar en BigQuery',
    principle3Desc: 'Reemplaza los JOINs multi-tabla con campos RECORD (STRUCT) y REPEATED (ARRAY) para eliminar cuellos de botella de shuffle distribuido.',
    principle4: 'Seguridad por Diseño',
    principle4Desc: 'Aplica IAM de mínimo privilegio, claves administradas por el cliente (CMEK) vía Cloud KMS, y tokenización de datos sensibles (DLP) para PII.',
    principle5: 'Escalabilidad Dirigida por Eventos',
    principle5Desc: 'Combina Cloud Pub/Sub con Cloud Dataflow usando watermarks de tiempo de evento y latencia permitida para flujos desordenados.',
    ctaBtn: 'Comenzar con la Sección 1: Diseño de Sistemas de Procesamiento de Datos →',
    modules: [
      {
        title: 'Módulo 1: Diseño de Sistemas de Procesamiento de Datos',
        weight: '~22% del Examen',
        badge: 'Sección 1',
        description: 'IAM, Org Policies, Cloud KMS, CMEK/CSEK, Cloud DLP, Soberanía de Datos, cumplimiento ACID, Dataform, y Migraciones de Datos (DTS, DMS, Datastream).',
        link: '/docs/module-1-designing-systems/security-and-compliance',
        lessons: 4,
      },
      {
        title: 'Módulo 2: Ingesta y Procesamiento de Datos',
        weight: '~25% del Examen',
        badge: 'Sección 2',
        description: 'Planificación de pipelines, Dataflow vs Dataproc vs BigQuery vs Fusion vs Pub/Sub, mecánicas de streaming Beam, windowing, watermarks, triggers, enriquecimiento con IA, y CI/CD.',
        link: '/docs/module-2-ingesting-processing/planning-data-pipelines',
        lessons: 3,
      },
      {
        title: 'Módulo 3: Almacenamiento de Datos',
        weight: '~20% del Examen',
        badge: 'Sección 3',
        description: 'Matriz de selección de almacenamiento (BigQuery, Bigtable, Spanner, Cloud SQL, AlloyDB, GCS, Firestore), data warehousing, particionado, clustering, BigLake, y Dataplex Data Mesh.',
        link: '/docs/module-3-storing-data/selecting-storage-systems',
        lessons: 4,
      },
      {
        title: 'Módulo 4: Análisis, BI y Machine Learning',
        weight: '~15% del Examen',
        badge: 'Sección 4',
        description: 'BI Engine, Materialized Views, depuración del Query Execution Graph, seguridad a nivel de columna y fila, algoritmos de BigQuery ML, Vector Search y RAG, y Analytics Hub.',
        link: '/docs/module-4-analysis-and-ml/visualization-and-bi',
        lessons: 3,
      },
      {
        title: 'Módulo 5: Operaciones, Fiabilidad y Optimización',
        weight: '~18% del Examen',
        badge: 'Sección 5',
        description: 'Optimización de costos en Dataproc (Spot VMs), diseño de DAGs en Cloud Composer / Airflow 2, BigQuery Editions y Reservations, depuración con INFORMATION_SCHEMA, y Recuperación ante Desastres.',
        link: '/docs/module-5-operations-and-reliability/resource-optimization',
        lessons: 5,
      },
      {
        title: 'Toolkit del Examen y Preguntas de Práctica',
        weight: 'Simulación Completa',
        badge: 'Preparación',
        description: 'Selector rápido de servicios en 10 segundos, hoja de referencia CLI (bq, gcloud, gsutil), cuotas arquitectónicas, y exámenes de práctica con escenarios y justificación detallada de respuestas.',
        link: '/docs/exam-prep/master-cheat-sheet',
        lessons: 2,
      },
    ],
  },
};

export default function Home() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const t = translations[locale] || translations.en;

  return (
    <Layout
      title={t.layoutTitle}
      description={t.layoutDesc}>
      
      <header className="heroBanner">
        <div className="container">
          <span className="featureBadge" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
            {t.badge}
          </span>
          <h1 className="heroTitle">{t.heroTitle}</h1>
          <p className="heroSubtitle">
            {t.heroSubtitle}
          </p>
          <div className="buttons">
            <Link
              className="button button--primary button--lg"
              to="/docs">
              {t.startBtn}
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/exam-prep/master-cheat-sheet">
              {t.cheatBtn}
            </Link>
            <Link
              className="button button--outline button--success button--lg"
              to="/docs/exam-prep/practice-exam-questions">
              {t.practiceBtn}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="container">
          <div style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '1rem' }}>
            <h2>{t.modulesHeading}</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.8 }}>
              {t.modulesDesc}
            </p>
          </div>

          <div className="featuresGrid">
            {t.modules.map((mod, idx) => (
              <div key={idx} className="featureCard">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="featureBadge">{mod.badge}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.7 }}>{mod.weight}</span>
                </div>
                <h3 className="featureTitle">{mod.title}</h3>
                <p className="featureDesc">{mod.description}</p>
                <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{mod.lessons} {t.lessonsLabel}</span>
                  <Link className="button button--sm button--primary" to={mod.link}>
                    {t.studyBtn}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: 'var(--ifm-background-surface-color)', padding: '3rem 1rem', marginTop: '3rem', borderTop: '1px solid rgba(128,128,128,0.1)' }}>
          <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
            <h2>{t.principlesHeading}</h2>
            <div style={{ textAlign: 'left', marginTop: '1.5rem', lineHeight: 1.7 }}>
              <p>1. <strong>{t.principle1}</strong>: {t.principle1Desc}</p>
              <p>2. <strong>{t.principle2}</strong>: {t.principle2Desc}</p>
              <p>3. <strong>{t.principle3}</strong>: {t.principle3Desc}</p>
              <p>4. <strong>{t.principle4}</strong>: {t.principle4Desc}</p>
              <p>5. <strong>{t.principle5}</strong>: {t.principle5Desc}</p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link className="button button--primary button--lg" to="/docs">
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
