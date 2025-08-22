import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="wine-primary w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">FreshMarket</h3>
                <p className="text-sm text-gray-400">Mercado Alimentício</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Os melhores produtos alimentícios com qualidade garantida e entrega rápida para sua casa.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categorias/frutas" className="text-gray-300 hover:text-white">
                  Frutas
                </Link>
              </li>
              <li>
                <Link href="/categorias/verduras" className="text-gray-300 hover:text-white">
                  Verduras
                </Link>
              </li>
              <li>
                <Link href="/categorias/carnes" className="text-gray-300 hover:text-white">
                  Carnes
                </Link>
              </li>
              <li>
                <Link href="/categorias/laticinios" className="text-gray-300 hover:text-white">
                  Laticínios
                </Link>
              </li>
              <li>
                <Link href="/categorias/padaria" className="text-gray-300 hover:text-white">
                  Padaria
                </Link>
              </li>
              <li>
                <Link href="/categorias/bebidas" className="text-gray-300 hover:text-white">
                  Bebidas
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-gray-300 hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-white">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-wine" />
                <span className="text-gray-300">(11) 3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-wine" />
                <span className="text-gray-300">contato@freshmarket.com.br</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-wine mt-0.5" />
                <span className="text-gray-300">
                  Rua das Flores, 123
                  <br />
                  São Paulo - SP, 01234-567
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 FreshMarket. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
