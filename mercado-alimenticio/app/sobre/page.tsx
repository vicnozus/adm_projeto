import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Truck, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="wine-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Sobre o FreshMarket</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Há mais de 10 anos levando produtos frescos e de qualidade para a mesa das famílias brasileiras, com o
              compromisso de oferecer sempre o melhor em alimentação saudável e sustentável.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Nossa História */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-wine mb-6">Nossa História</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  O FreshMarket nasceu em 2014 com um sonho simples: democratizar o acesso a alimentos frescos e de
                  qualidade. Começamos como uma pequena feira local em São Paulo, onde conhecíamos cada cliente pelo
                  nome e sabíamos exatamente o que cada família precisava.
                </p>
                <p>
                  Com o crescimento da demanda por conveniência sem abrir mão da qualidade, expandimos para o mundo
                  digital, mantendo sempre nossos valores fundamentais: frescor, qualidade e atendimento personalizado.
                </p>
                <p>
                  Hoje, atendemos milhares de famílias em todo o Brasil, mas continuamos com o mesmo carinho e atenção
                  aos detalhes que nos trouxeram até aqui.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/fresh-market-story.png"
                alt="História do FreshMarket"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-wine text-center mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Qualidade</h3>
                <p className="text-gray-600 text-sm">
                  Selecionamos cuidadosamente cada produto, garantindo sempre a melhor qualidade para nossos clientes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Agilidade</h3>
                <p className="text-gray-600 text-sm">
                  Entregamos seus produtos frescos em até 2 horas, mantendo toda a qualidade e frescor.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Relacionamento</h3>
                <p className="text-gray-600 text-sm">
                  Construímos relacionamentos duradouros, tratando cada cliente como parte da nossa família.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Excelência</h3>
                <p className="text-gray-600 text-sm">
                  Buscamos constantemente a excelência em todos os aspectos do nosso serviço e atendimento.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Números */}
        <section className="mb-16 wine-primary text-white py-16 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">FreshMarket em Números</h2>
            <p className="text-gray-200">Nosso crescimento reflete a confiança dos nossos clientes</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-gray-200">Clientes Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-gray-200">Pedidos Entregues</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-200">Produtos Disponíveis</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-200">Satisfação dos Clientes</div>
            </div>
          </div>
        </section>

        {/* Sustentabilidade */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/sustainability-fresh-market.png"
                alt="Sustentabilidade FreshMarket"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-wine mb-6">Compromisso com a Sustentabilidade</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Acreditamos que cuidar do planeta é cuidar do futuro da alimentação. Por isso, trabalhamos
                  exclusivamente com fornecedores que compartilham nossos valores de sustentabilidade e responsabilidade
                  ambiental.
                </p>
                <p>
                  Nossos produtos orgânicos são cultivados sem agrotóxicos, respeitando o meio ambiente e oferecendo
                  alimentos mais saudáveis para sua família.
                </p>
                <p>
                  Além disso, utilizamos embalagens biodegradáveis e temos um programa de logística reversa para reduzir
                  nosso impacto ambiental.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
