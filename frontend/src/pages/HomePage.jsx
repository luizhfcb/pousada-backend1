import { Link } from 'react-router-dom'

import { RoomsShowcase } from '../features/public/RoomsShowcase'

const highlights = [
  'Ambiente tranquilo para casais, famílias e pequenos grupos',
  'Quartos confortáveis para descanso depois de um dia especial',
  'Atendimento acolhedor com clima de casa no interior',
]

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Pousada Serra Bela</p>
          <h1>Um cantinho familiar para viver dias leves e descansar em paz</h1>
          <p>
            Cercada por natureza e silêncio, a Pousada Serra Bela recebe você
            com carinho, conforto e aquele clima gostoso de hospedagem em
            família.
          </p>

          <div className="button-row">
            <Link className="button" to="/quartos">
              Ver acomodações
            </Link>
            <Link className="button button-ghost" to="/admin/login">
              Falar com a equipe
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <span className="pill pill-success">Bem-estar e acolhimento</span>
          <ul className="highlight-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section ambience-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Experiência</p>
            <h2>Uma estadia pensada para quem busca descanso, cuidado e simplicidade</h2>
          </div>
          <p className="section-copy">
            Cada detalhe foi pensado para transmitir acolhimento: espaços
            tranquilos, atendimento próximo e ambientes confortáveis para toda
            a família.
          </p>
        </div>

        <div className="ambience-grid">
          <article className="ambience-card">
            <h3>Recepção calorosa</h3>
            <p>
              Um atendimento próximo e gentil desde a chegada, com atenção aos
              detalhes para você se sentir em casa.
            </p>
          </article>
          <article className="ambience-card">
            <h3>Quartos aconchegantes</h3>
            <p>
              Ambientes agradáveis para relaxar, dormir bem e aproveitar o ritmo
              tranquilo da serra.
            </p>
          </article>
          <article className="ambience-card">
            <h3>Momentos em família</h3>
            <p>
              Um lugar gostoso para compartilhar café da manhã, conversar sem
              pressa e criar boas lembranças.
            </p>
          </article>
        </div>
      </section>

      <section className="section ambience-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Diferenciais</p>
            <h2>Conforto, praticidade e aquela sensação boa de viagem tranquila</h2>
          </div>
          <p className="section-copy">
            Ideal para fins de semana, feriados e pausas merecidas longe da
            correria.
          </p>
        </div>

        <div className="ambience-grid">
          <article className="ambience-card">
            <h3>Café da manhã especial</h3>
            <p>
              Sabores caseiros, mesa farta e o início perfeito para um dia
              leve com a família.
            </p>
          </article>
          <article className="ambience-card">
            <h3>Localização tranquila</h3>
            <p>
              Um cenário sereno para descansar, respirar fundo e aproveitar o
              melhor da região.
            </p>
          </article>
          <article className="ambience-card">
            <h3>Atendimento próximo</h3>
            <p>
              Equipe atenciosa para ajudar no que for preciso e tornar a sua
              experiência ainda mais agradável.
            </p>
          </article>
        </div>
      </section>

      <RoomsShowcase />

      <section className="section cta-section">
        <div>
          <p className="eyebrow">Reserve seu descanso</p>
          <h2>Escolha a acomodação ideal e venha viver dias tranquilos com a gente</h2>
        </div>
        <p className="section-copy">
          Explore nossos quartos e fale com a equipe para planejar uma estadia
          acolhedora, prática e cheia de bons momentos.
        </p>
      </section>
    </>
  )
}
