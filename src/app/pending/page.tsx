'use client'

import { Clock, Home, Mail } from 'lucide-react'
import Link from 'next/link'

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <div className="mb-8">
          <Clock className="w-24 h-24 text-yellow-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pagamento Pendente
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Seu pagamento está sendo processado e aguardando confirmação.
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 mb-8 border-2 border-yellow-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            O Que Fazer Agora:
          </h2>
          <div className="text-left space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p>Você receberá um e-mail assim que o pagamento for confirmado</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p>O processamento pode levar de alguns minutos até 2 dias úteis</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p>Fique atento à sua caixa de entrada e pasta de spam</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-2">💡 Dica Importante</h3>
          <p className="text-gray-700 text-sm">
            Se você pagou via boleto ou PIX, o prazo de confirmação pode ser maior. 
            Assim que o pagamento for aprovado, você terá acesso imediato ao e-book.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Obrigado pela sua compra! Aguarde a confirmação do pagamento.
        </p>
      </div>
    </div>
  )
}
