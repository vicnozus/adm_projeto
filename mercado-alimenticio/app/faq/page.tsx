"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react"

const faqData = [
  {
    category: "Pedidos e Entregas",
    questions: [
      {
        question: "Qual é o prazo de entrega?",
        answer:
          "Nosso prazo de entrega é de até 2 horas para a região metropolitana de São Paulo. Para outras regiões, o prazo pode variar entre 4 a 6 horas. Você pode acompanhar o status do seu pedido em tempo real através do nosso app ou site.",
      },
      {
        question: "Qual é o valor mínimo para pedidos?",
        answer:
          "O valor mínimo para pedidos é de R$ 30,00. Para pedidos acima de R$ 150,00, a entrega é gratuita. Abaixo desse valor, cobramos uma taxa de entrega de R$ 12,90.",
      },
      {
        question: "Posso alterar ou cancelar meu pedido?",
        answer:
          "Sim, você pode alterar ou cancelar seu pedido até 15 minutos após a confirmação. Após esse prazo, entre em contato conosco pelo telefone (11) 3456-7890 e verificaremos se ainda é possível fazer alterações.",
      },
      {
        question: "Como acompanho meu pedido?",
        answer:
          "Você pode acompanhar seu pedido através da área 'Meus Pedidos' no site ou app. Também enviamos notificações por SMS e email com atualizações sobre o status da entrega.",
      },
    ],
  },
  {
    category: "Pagamentos",
    questions: [
      {
        question: "Quais formas de pagamento vocês aceitam?",
        answer:
          "Aceitamos cartões de crédito e débito (Visa, Mastercard, Elo), PIX, boleto bancário e vale-alimentação (Sodexo, Ticket, VR). Para cartão de crédito, oferecemos parcelamento em até 12x sem juros.",
      },
      {
        question: "É seguro fazer pagamentos no site?",
        answer:
          "Sim, nosso site utiliza certificado SSL e criptografia de dados para garantir a segurança das suas informações. Não armazenamos dados de cartão de crédito em nossos servidores.",
      },
      {
        question: "Posso usar cupons de desconto?",
        answer:
          "Sim, oferecemos cupons de desconto regularmente. Você pode aplicar o cupom no carrinho antes de finalizar a compra. Fique atento às nossas promoções por email e redes sociais.",
      },
    ],
  },
  {
    category: "Produtos",
    questions: [
      {
        question: "Como garantem a qualidade dos produtos?",
        answer:
          "Todos os nossos produtos passam por rigoroso controle de qualidade. Trabalhamos apenas com fornecedores certificados e nossos produtos perecíveis são armazenados em condições ideais de temperatura e umidade.",
      },
      {
        question: "Vocês vendem produtos orgânicos?",
        answer:
          "Sim, temos uma ampla seleção de produtos orgânicos certificados. Você pode filtrar por 'orgânicos' na busca ou visitar nossa seção especial de produtos naturais.",
      },
      {
        question: "E se eu receber um produto com defeito?",
        answer:
          "Se você receber algum produto com defeito ou fora do prazo de validade, entre em contato conosco imediatamente. Faremos a troca ou reembolso integral, além de enviar um novo produto sem custo adicional.",
      },
      {
        question: "Posso devolver produtos?",
        answer:
          "Para produtos não perecíveis, aceitamos devoluções em até 7 dias corridos. Para produtos perecíveis, aceitamos devoluções apenas em caso de defeito ou problema de qualidade.",
      },
    ],
  },
  {
    category: "Conta e Cadastro",
    questions: [
      {
        question: "É obrigatório criar uma conta para comprar?",
        answer:
          "Sim, é necessário criar uma conta para fazer pedidos. Isso nos permite oferecer um melhor atendimento, histórico de pedidos e recomendações personalizadas.",
      },
      {
        question: "Como altero meus dados cadastrais?",
        answer:
          "Você pode alterar seus dados na área 'Meu Perfil' após fazer login. Lá você pode atualizar informações pessoais, endereços e preferências de comunicação.",
      },
      {
        question: "Esqueci minha senha, como recupero?",
        answer:
          "Na tela de login, clique em 'Esqueci minha senha' e digite seu email. Enviaremos um link para redefinir sua senha. Se não receber o email, verifique sua caixa de spam.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="wine-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="wine-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/20">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Perguntas Frequentes</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar nas perguntas frequentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-wine-primary"
            />
          </div>
        </div>

        {/* FAQ Content */}
        {filteredFAQ.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-serif font-bold text-wine mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((item, itemIndex) => {
                    const itemId = `${categoryIndex}-${itemIndex}`
                    const isOpen = openItems.includes(itemId)

                    return (
                      <Card key={itemIndex} className="overflow-hidden">
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                          >
                            <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-wine flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-wine flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6">
                              <div className="border-t pt-4">
                                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma pergunta encontrada</h3>
            <p className="text-gray-600 mb-4">Tente buscar com outros termos ou entre em contato conosco.</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="max-w-2xl mx-auto mt-16">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-bold text-wine mb-4">Não encontrou sua resposta?</h3>
              <p className="text-gray-600 mb-6">
                Nossa equipe de atendimento está pronta para ajudar você com qualquer dúvida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contato"
                  className="inline-flex items-center justify-center px-6 py-3 wine-primary hover:wine-dark text-white rounded-lg font-semibold transition-colors"
                >
                  Entre em Contato
                </a>
                <a
                  href="tel:1134567890"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-wine text-wine hover:wine-primary hover:text-white rounded-lg font-semibold transition-colors"
                >
                  (11) 3456-7890
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
