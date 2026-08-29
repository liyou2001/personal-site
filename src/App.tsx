import { useEffect } from 'react'
import {
  ArrowUpRight,
  Code2,
  ContactRound,
  Download,
  Leaf,
  Mail,
  MessageSquareText,
  ReceiptText,
} from 'lucide-react'
import './App.css'

const experiences = [
  {
    role: 'AI Research Intern',
    organization: 'UW–Madison · Department of Computer Sciences',
    location: 'Madison, WI',
    period: 'Sep 2023 — Present',
    summary:
      'Building and evaluating LLM agents that model how opinions evolve across demographic groups.',
    highlights: [
      'Curated high-quality human debate samples through a Python data pipeline for training opinion-simulation agents.',
      'Fine-tuned models with SFT and DPO, reaching 78% embedding-based semantic similarity to human responses.',
      'Parallelized simulation pipelines to cut experiment runtime from 3 days to 12 hours.',
    ],
    accent: 'coral',
  },
  {
    role: 'Software Engineer Intern',
    organization: 'Intelligible AI',
    location: 'Madison, WI',
    period: 'May 2026 — Aug 2026',
    summary:
      'Shipped search, data onboarding, and asynchronous workflow features for an enterprise AI platform.',
    highlights: [
      'Implemented semantic search for 500+ users with Cohere Embed, Cohere Rerank, and OpenSearch Serverless.',
      'Automated dataset provisioning with Next.js, Lambda, and DynamoDB for three enterprise clients.',
      'Built job-completion notifications with FastAPI, React, and PostgreSQL.',
    ],
    accent: 'teal',
  },
  {
    role: 'Software Engineer Intern',
    organization: 'MDAQ Global',
    location: 'Singapore',
    period: 'Sep 2024 — Feb 2025',
    summary:
      'Automated internal software lifecycle workflows across APIs, infrastructure, and background jobs.',
    highlights: [
      'Developed Django and PostgreSQL APIs for an internal lifecycle management platform.',
      'Delivered S3 document uploads with Terraform-managed infrastructure.',
      'Moved workflows to Celery and SQS, removing roughly seven-second blocking waits.',
    ],
    accent: 'blue',
  },
  {
    role: 'AI Engineer Intern',
    organization: 'KLASS Engineering and Solutions',
    location: 'Singapore',
    period: 'May 2023 — Aug 2023',
    summary:
      'Trained and deployed perception models for autonomous patrol robots operating on city streets.',
    highlights: [
      'Evaluated EfficientPS, YOSO, and Mask2Former models for scene recognition.',
      'Containerized computer vision models and deployed them to Jueying X20 robots.',
    ],
    accent: 'yellow',
  },
  {
    role: 'AI Research Intern',
    organization: 'A*STAR',
    location: 'Singapore',
    period: 'Jan 2022 — Sep 2022',
    summary:
      'Built experimental research software and studied how vision models learn novel objects.',
    highlights: [
      'Created a Flask and SQLite study platform used by more than 500 participants.',
      'Evaluated CNN and Vision Transformer models across novel-object and image-transformation datasets.',
    ],
    accent: 'coral',
  },
]

const projects = [
  {
    name: 'Spendly',
    label: 'Mobile · AI',
    description:
      'An AI-powered expense tracker that turns receipt photos and forwarded invoices into structured, categorized expenses.',
    detail:
      'GPT-4o Vision handles extraction, while Supabase provides authentication, Postgres, storage, and row-level security.',
    stack: ['React Native', 'Fastify', 'Supabase', 'GPT-4o'],
    href: 'https://github.com/liyou2001/spendly',
    visual: 'spendly',
  },
  {
    name: 'CarbonWise',
    label: 'Web · Climate',
    description:
      'A personal carbon accounting app that connects bank transactions and automatically estimates their carbon impact.',
    detail:
      'Plaid webhooks keep transactions in sync, with a Next.js application backed by Supabase and Drizzle.',
    stack: ['Next.js', 'Plaid', 'Supabase', 'Drizzle'],
    href: 'https://github.com/liyou2001/carbonwise',
    visual: 'carbon',
  },
  {
    name: 'Tweet Stance Classifier',
    label: 'NLP · Research',
    description:
      'A language-model pipeline that classifies the stance expressed in tweets by fine-tuning FLAN-T5 Large.',
    detail:
      'Includes streaming dataset loading, configurable training and inference, plus accuracy and F1 evaluation.',
    stack: ['Python', 'PyTorch', 'FLAN-T5', 'Transformers'],
    href: 'https://github.com/liyou2001/tweet-stance-classification',
    visual: 'stance',
  },
]

const publications = [
  {
    year: '',
    status: 'Under review 2025',
    title:
      'DEBATE: A Large-Scale Benchmark for Evaluating Opinion Dynamics in Role-Playing LLM Agents',
    authors: 'Y. Chuang, R. Tu*, C. Dai*, Y. Li* et al.',
    venue: 'arXiv preprint',
    href: 'https://arxiv.org/abs/2510.25110',
  },
  {
    year: '',
    status: 'ICCV 2023',
    title: 'Learning to Learn: How to Continuously Teach Humans and Machines',
    authors:
      'P. Singh, Y. Li, A. Sikarwar, W. Lei, D. Gao, M. B. Talbot, Y. Sun, M. Z. Shou, G. Kreiman, M. Zhang',
    venue: 'International Conference on Computer Vision',
    href: 'https://arxiv.org/abs/2211.15470',
  },
  {
    year: '',
    status: 'NeurIPS Workshop 2024',
    title:
      'Improving Out-of-Distribution Generalization by Mimicking the Human Visual Diet',
    authors: 'S. Madan, Y. Li, M. Zhang, H. Pfister, G. Kreiman',
    venue:
      'Conference on Neural Information Processing Systems (NeurIPS 2024) · Workshop on NeuroAI: Fusing Neuroscience and AI for Intelligent Solutions',
    href: 'https://arxiv.org/abs/2206.07802',
  },
]

function PublicationAuthors({ authors }: { authors: string }) {
  const [beforeName, afterName] = authors.split('Y. Li')

  return (
    <>
      {beforeName}<strong>Y. Li</strong>{afterName}
    </>
  )
}

function ProjectVisual({ type }: { type: string }) {
  if (type === 'spendly') {
    return (
      <div className="project-visual spendly-visual" aria-hidden="true">
        <div className="receipt">
          <ReceiptText size={28} strokeWidth={1.6} />
          <span className="receipt-merchant">Willy Street Co-op</span>
          <strong>$42.80</strong>
          <span className="receipt-category">Food & dining</span>
        </div>
        <div className="scan-line" />
      </div>
    )
  }

  if (type === 'carbon') {
    return (
      <div className="project-visual carbon-visual" aria-hidden="true">
        <div className="carbon-heading">
          <Leaf size={25} strokeWidth={1.7} />
          <span>This month</span>
        </div>
        <strong>186 kg</strong>
        <div className="carbon-bars">
          <i style={{ height: '38%' }} />
          <i style={{ height: '54%' }} />
          <i style={{ height: '43%' }} />
          <i style={{ height: '76%' }} />
          <i style={{ height: '62%' }} />
          <i style={{ height: '88%' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="project-visual stance-visual" aria-hidden="true">
      <MessageSquareText size={34} strokeWidth={1.5} />
      <p>“This policy could make a real difference.”</p>
      <div className="stance-result">
        <span>Stance</span>
        <strong>Support</strong>
        <i>94%</i>
      </div>
    </div>
  )
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Leo Li, home">
          LL<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Experience</a>
          <a href="#publications">Publications</a>
          <a href="#projects">Projects</a>
        </nav>
        <a className="header-contact" href="mailto:liyou2001@gmail.com">
          <Mail size={16} aria-hidden="true" />
          <span>Get in touch</span>
        </a>
      </header>

      <main id="main">
        <section className="hero-section" id="top">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">AI researcher + software engineer</p>
            <h1>Leo Li</h1>
            <p className="hero-statement">
              I build intelligent systems that move from <em>research ideas</em> to dependable products.
            </p>
            <div className="hero-meta">
              <div className="hero-profile">
                <p>
                  Computer Science at UW–Madison, working across language models,
                  full-stack systems, and applied machine learning. Based in Madison,
                  Wisconsin.
                </p>
                <p className="education-note">
                  <span>Graduating</span>
                  <strong>December 2026 · GPA 3.89</strong>
                </p>
              </div>
              <div className="hero-actions">
                <a
                  className="primary-button"
                  href="/You_Li_Resume_US_SWE.pdf"
                  download="Leo_Li_Resume.pdf"
                >
                  Download resume <Download size={17} aria-hidden="true" />
                </a>
                <a
                  className="icon-link"
                  href="https://github.com/liyou2001"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <Code2 size={20} />
                </a>
                <a
                  className="icon-link"
                  href="https://www.linkedin.com/in/you-li-2345youi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <ContactRound size={20} />
                </a>
              </div>
            </div>
          </div>

        </section>

        <section className="section work-section" id="work">
          <div className="section-heading section-heading-simple reveal">
            <h2>Work Experience</h2>
          </div>

          <div className="experience-list">
            {experiences.map((experience, index) => (
              <article className="experience-item reveal" key={`${experience.organization}-${experience.period}`}>
                <div className={`experience-index ${experience.accent}`}>{String(index + 1).padStart(2, '0')}</div>
                <div className="experience-main">
                  <div className="experience-title-row">
                    <div>
                      <h3>{experience.role}</h3>
                      <p className="organization">{experience.organization}</p>
                    </div>
                    <div className="experience-meta">
                      <span>{experience.period}</span>
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  <p className="experience-summary">{experience.summary}</p>
                  <ul>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section publications-section" id="publications">
          <div className="section-heading section-heading-simple reveal">
            <h2>Publications</h2>
          </div>

          <div className="publication-list">
            {publications.map((publication, index) => (
              <a
                className="publication-item reveal"
                href={publication.href}
                target="_blank"
                rel="noreferrer"
                key={publication.title}
              >
                <div className="publication-number">0{index + 1}</div>
                <div className="publication-copy">
                  <div className="publication-status">
                    <span>{publication.status}</span>
                    {publication.year && <span>{publication.year}</span>}
                  </div>
                  <h3>{publication.title}</h3>
                  <p><PublicationAuthors authors={publication.authors} /></p>
                  <span className="publication-venue">{publication.venue}</span>
                </div>
                <ArrowUpRight className="publication-arrow" size={24} aria-hidden="true" />
              </a>
            ))}
            <p className="contribution-note reveal">* Authors with core contributions</p>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading section-heading-simple reveal">
            <h2>Projects</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card reveal" key={project.name}>
                <ProjectVisual type={project.visual} />
                <div className="project-content">
                  <div className="project-label-row">
                    <span>{project.label}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-detail">{project.detail}</p>
                  <ul className="tag-list" aria-label={`${project.name} technologies`}>
                    {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                  <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
                    View repository <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-band" aria-label="Technical skills">
          <div className="skills-inner reveal">
            <h2 className="eyebrow">Skills</h2>
            <div className="skills-columns">
              <div><span>Languages</span><strong>Python, TypeScript, JavaScript, Java, SQL</strong></div>
              <div><span>Frameworks</span><strong>Next.js, React, Django, FastAPI, PyTorch</strong></div>
              <div><span>Cloud & data</span><strong>AWS, Docker, Terraform, PostgreSQL, OpenSearch</strong></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-layout reveal">
            <h2>Contact</h2>
            <div className="contact-copy">
              <p>I’m always glad to talk about applied AI, research, or building useful software.</p>
              <a className="contact-email" href="mailto:liyou2001@gmail.com">
                liyou2001@gmail.com <ArrowUpRight size={22} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Leo Li</span>
        <div>
          <a href="https://github.com/liyou2001" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/you-li-2345youi" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}

export default App
