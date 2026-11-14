import React from 'react'
type Item = {
  id: number
  description: string
  quantity: number
  price: number
}

type Template = 'classic' | 'modern' | 'minimal'

type Props = {
  quoteNumber: string
  customer: string
  email: string
  items: Item[]
  gst: number
  subtotal: number
  tax: number
  grandTotal: number
  businessName: string
  businessAddress: string
  businessEmail: string
  businessPhone: string
  businessGSTIN: string
  businessLogo: string
}
const money = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value)

function QuotationPreview({
  quoteNumber,
  customer,
  email,
  items,
  gst,
  subtotal,
  tax,
    grandTotal,
  businessName,
  businessAddress,
  businessEmail,
  businessPhone,
  businessGSTIN,
  businessLogo,
}: Props) {
  const [template, setTemplate] = React.useState<Template>('classic')

  return (
    <section className="preview-section">
      <div className="preview-toolbar">
        <div>
          <h2>Live quotation preview</h2>
          <p>See how your quotation will look.</p>
        </div>

        <div className="template-selector">
          {(['classic', 'modern', 'minimal'] as Template[]).map(name => (
            <button
              key={name}
              className={template === name ? 'selected' : ''}
              onClick={() => setTemplate(name)}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <article className={`quotation-paper ${template}`}>
        <header className="paper-header">
          <div>
            {businessLogo && (
  <img
    src={businessLogo}
    alt="Company logo"
    className="paper-logo"
  />
)}
            <h1>{businessName || 'YOUR BUSINESS NAME'}</h1>
<p>{businessAddress || 'Your business address'}</p>
<p>{businessEmail} {businessPhone && `· ${businessPhone}`}</p>
<p>GSTIN: {businessGSTIN || 'Not provided'}</p>
          </div>

          <div className="quote-label">
            <h2>QUOTATION</h2>
            <strong>{quoteNumber || 'QT-0001'}</strong>
          </div>
        </header>

        <div className="paper-divider" />

        <div className="paper-details">
          <div>
            <small>QUOTATION FOR</small>
            <h3>{customer || 'Customer name'}</h3>
            <p>{email || 'Customer email'}</p>
          </div>

          <div className="paper-date">
            <small>ISSUE DATE</small>
            <p>{new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <table className="paper-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit price</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.description || 'Product / Service'}</td>
                <td>{item.quantity}</td>
                <td>{money(item.price)}</td>
                <td>{money(item.quantity * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="paper-total">
          <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div><span>GST ({gst}%)</span><strong>{money(tax)}</strong></div>
          <div className="paper-grand-total">
            <span>Grand total</span>
            <strong>{money(grandTotal)}</strong>
          </div>
        </div>

        <div className="paper-footer">
          <div>
            <h4>Terms & Conditions</h4>
            <p>Payment and delivery terms as agreed between the parties.</p>
          </div>

          <div className="signature">
            <p>For {businessName || 'YOUR BUSINESS NAME'}</p>
            <br /><br />
            <strong>Authorised Signatory</strong>
          </div>
        </div>

        <div className="paper-thankyou">
          Thank you for your business.
        </div>
      </article>
    </section>
  )
}

export default QuotationPreview
