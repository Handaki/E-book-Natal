'use client'

import { CheckCircle, Download, Home } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pagamento Aprovado! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Parabéns! Seu pagamento foi processado com sucesso.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border-2 border-green-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Próximos Passos:
          </h2>
          <div className="text-left space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p>Você receberá um e-mail com o link de download do e-book em alguns instantes</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p>Verifique sua caixa de entrada e também a pasta de spam</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p>O acesso ao e-book é vitalício - você pode baixar quantas vezes quiser</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Baixar E-book Agora
          </button>
          <Link 
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Obrigado por sua compra! Desejamos um Feliz Natal e Próspero Ano Novo! 🎄✨
        </p>
      </div>
    </div>
  )
}
