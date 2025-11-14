import { NextRequest, NextResponse } from 'next/server'
import mercadopago from 'mercadopago'

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.PUBLIC_TOKEN || ''
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verificar o tipo de notificação
    if (body.type === 'payment') {
      const paymentId = body.data.id
      
      // Buscar informações do pagamento
      const payment = await mercadopago.payment.get(paymentId)
      
      // Processar de acordo com o status
      if (payment.body.status === 'approved') {
        // Pagamento aprovado - aqui você pode:
        // - Enviar e-mail com o e-book
        // - Registrar a venda no banco de dados
        // - Gerar link de download
        console.log('Pagamento aprovado:', payment.body)
      }
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    )
  }
}
