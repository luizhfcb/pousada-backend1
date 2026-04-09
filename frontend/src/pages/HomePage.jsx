import { Link } from 'react-router-dom'

import { RoomsShowcase } from '../features/public/RoomsShowcase'

const highlights = [
  'Ambiente tranquilo',
  'Café da manhã caseiro',
  'Atendimento próximo',
]

const features = [
  {
    title: 'Conforto sem exagero',
    description: 'Quartos acolhedores, bem iluminados e pensados para descanso.',
  },
  {
    title: 'Clima familiar',
    description: 'Uma hospedagem simples, gentil e com sensação de casa.',
  },
  {
    title: 'Boa localização',
    description: 'Perfeita para fins de semana tranquilos e pausas na rotina.',
  },
]

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Pousada Serra Bela</p>
          <h1>Descanso leve em um ambiente acolhedor para toda a família</h1>
          <p>
            Uma estadia tranquila, com conforto na medida certa e atendimento
            próximo do começo ao fim.
          </p>

          <div className="button-row">
            <Link className="button" to="/quartos">
              Ver acomodações
            </Link>
            <a className="button button-ghost" href="#diferenciais">
              Conhecer diferenciais
            </a>
          </div>
        </div>

        <div className="hero-card">
          <p className="eyebrow">O essencial para relaxar</p>
          <ul className="hero-badges">
            {highlights.map((item) => (
              <li className="pill pill-success" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <p className="hero-note">
            Ideal para quem quer sossego, simplicidade e uma hospedagem bem
            cuidada.
          </p>
        </div>
      </section>

      <section className="section ambience-section" id="diferenciais">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Diferenciais</p>
            <h2>Menos excessos, mais conforto e tranquilidade</h2>
          </div>
          <p className="section-copy">
            Um site mais direto, com leitura leve e foco no que realmente
            importa para quem está procurando hospedagem.
          </p>
        </div>

        <div className="ambience-grid">
          {features.map((feature) => (
            <article className="ambience-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <RoomsShowcase />

      <section className="section cta-section">
        <div>
          <p className="eyebrow">Sua próxima estadia</p>
          <h2>Escolha a acomodação ideal e aproveite dias mais calmos</h2>
        </div>
        <p className="section-copy">
          Veja os quartos disponíveis e encontre a opção que combina melhor com
          a sua viagem.
        </p>
      </section>
    </>
  )
}
