'use client'

import { XCircle, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <div className="mb-8">
          <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pagamento Não Aprovado
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Infelizmente, não foi possível processar seu pagamento.
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 mb-8 border-2 border-red-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Possíveis Motivos:
          </h2>
          <div className="text-left space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-red-500 font-bold">•</span>
              <p>Saldo insuficiente ou limite do cartão excedido</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500 font-bold">•</span>
              <p>Dados do cartão incorretos ou vencido</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500 font-bold">•</span>
              <p>Problemas temporários com a operadora</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500 font-bold">•</span>
              <p>Transação cancelada pelo usuário</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Tentar Novamente
          </Link>
          <Link 
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Se o problema persistir, entre em contato com seu banco ou tente outro método de pagamento.
        </p>
      </div>
    </div>
  )
}
