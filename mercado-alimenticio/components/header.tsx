"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()
  const { summary } = useCart()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top bar */}
      <div className="wine-primary text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Frete grátis para compras acima de R$ 150,00 | Entrega em até 2 horas
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="wine-primary w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-wine">FreshMarket</h1>
              <p className="text-xs text-gray-600">Mercado Alimentício</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar produtos, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-wine-primary"
              />
              <Button className="absolute right-1 top-1 wine-primary hover:wine-dark text-white px-4 py-2 rounded-md">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-wine hover:text-wine-dark">
                    <User className="w-5 h-5" />
                    <span className="text-sm hidden md:inline">Olá, {user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/perfil">Meu Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pedidos">Meus Pedidos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favoritos">Favoritos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hidden md:flex items-center space-x-1 text-wine hover:text-wine-dark">
                <User className="w-5 h-5" />
                <span className="text-sm">Entrar</span>
              </Link>
            )}

            <Link href="/carrinho" className="relative">
              <Button
                variant="outline"
                size="sm"
                className="border-wine text-wine hover:wine-primary hover:text-white bg-transparent"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="ml-1 hidden sm:inline">Carrinho</span>
                {summary.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 wine-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {summary.itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-wine-primary"
            />
            <Button className="absolute right-1 top-1 wine-primary hover:wine-dark text-white px-4 py-2 rounded-md">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="wine-dark text-white">
        <div className="container mx-auto px-4">
          <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 py-4">
              <li>
                <Link href="/categorias/frutas" className="block py-2 md:py-0 hover:text-gray-200">
                  Frutas
                </Link>
              </li>
              <li>
                <Link href="/categorias/verduras" className="block py-2 md:py-0 hover:text-gray-200">
                  Verduras
                </Link>
              </li>
              <li>
                <Link href="/categorias/carnes" className="block py-2 md:py-0 hover:text-gray-200">
                  Carnes
                </Link>
              </li>
              <li>
                <Link href="/categorias/laticinios" className="block py-2 md:py-0 hover:text-gray-200">
                  Laticínios
                </Link>
              </li>
              <li>
                <Link href="/categorias/padaria" className="block py-2 md:py-0 hover:text-gray-200">
                  Padaria
                </Link>
              </li>
              <li>
                <Link href="/categorias/bebidas" className="block py-2 md:py-0 hover:text-gray-200">
                  Bebidas
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="block py-2 md:py-0 hover:text-gray-200 font-semibold">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
