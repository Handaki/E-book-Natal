import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.PUBLIC_TOKEN

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Token do Mercado Pago não configurado' },
        { status: 500 }
      )
    }

    const preference = {
      items: [
        {
          title: 'E-book: 60 Receitas Natalinas',
          description: 'E-book completo com 60 receitas exclusivas para sua ceia de Natal e Ano Novo',
          unit_price: 15.00,
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pending`
      },
      auto_return: 'approved',
      statement_descriptor: 'EBOOK RECEITAS',
      external_reference: `ebook-${Date.now()}`,
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/webhook`
    }

    // Fazer requisição direta para a API do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(preference)
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Erro do Mercado Pago:', errorData)
      return NextResponse.json(
        { error: 'Erro ao criar preferência de pagamento' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    return NextResponse.json({ 
      preferenceId: data.id,
      initPoint: data.init_point
    })
  } catch (error) {
    console.error('Erro ao criar preferência:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
