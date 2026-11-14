import QuotationPreview from './QuotationPreview'
import { useState } from 'react'
import './App.css'

type Item = {
  id: number
  description: string
  quantity: number
  price: number
}

const money = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value)

function App() {
  const [showForm, setShowForm] = useState(false)
  const [customer, setCustomer] = useState('')
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('Kenza Group')
const [businessAddress, setBusinessAddress] = useState('')
const [businessEmail, setBusinessEmail] = useState('')
const [businessPhone, setBusinessPhone] = useState('')
const [businessGSTIN, setBusinessGSTIN] = useState('')
const [businessLogo, setBusinessLogo] = useState<string>('')
  const [quoteNumber, setQuoteNumber] = useState('QT-0001')
  const [gst, setGst] = useState(18)
  const [items, setItems] = useState<Item[]>([
    { id: 1, description: '', quantity: 1, price: 0 },
  ])

  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  )
  const tax = subtotal * gst / 100
  const grandTotal = subtotal + tax

  const updateItem = (id: number, field: keyof Item, value: string) => {
    setItems(current =>
      current.map(item =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === 'description' ? value : Number(value),
            }
          : item,
      ),
    )
  }

  const addItem = () => {
    setItems(current => [
      ...current,
      {
        id: Date.now(),
        description: '',
        quantity: 1,
        price: 0,
      },
    ])
  }

  const removeItem = (id: number) => {
    setItems(current => current.filter(item => item.id !== id))
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">Q</span>
          <span>QuoteCraft</span>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav>
          <a className="nav-item active" href="#dashboard">▦ Dashboard</a>
          <a className="nav-item" href="#quotations">▤ Quotations</a>
          <a className="nav-item" href="#clients">♙ Clients</a>
          <a className="nav-item" href="#products">◇ Products & Services</a>
        </nav>

        <div className="sidebar-bottom">
          <a className="nav-item" href="#settings">⚙ Settings</a>
          <div className="profile">
            <div className="avatar">S</div>
            <div>
              <strong>Your Workspace</strong>
              <small>Free account</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>Workspace / {showForm ? 'New quotation' : 'Dashboard'}</span>
          <div className="topbar-right">
            <span className="status-dot" /> All changes saved
            <div className="avatar">S</div>
          </div>
        </header>

        {showForm ? (
          <section className="quotation-editor">
            <button
              className="back-button"
              onClick={() => setShowForm(false)}
            >
              ← Back to dashboard
            </button>

            <div className="editor-heading">
              <div>
                <p className="eyebrow">QUOTATION BUILDER</p>
                <h1>Create quotation</h1>
                <p className="subtitle">
                  Enter your details to prepare a professional quotation.
                </p>
              </div>
            </div>

<div className="editor-card">
  <h2>Business details</h2>

  <div className="form-grid">
    <label>
      Business / Company name
      <input
        placeholder="Your company name"
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
      />
    </label>

    <label>
      Business email
      <input
        type="email"
        placeholder="business@example.com"
        value={businessEmail}
        onChange={e => setBusinessEmail(e.target.value)}
      />
    </label>

    <label>
      Phone number
      <input
        type="tel"
        placeholder="+91 XXXXX XXXXX"
        value={businessPhone}
        onChange={e => setBusinessPhone(e.target.value)}
      />
    </label>

    <label>
      GSTIN
      <input
        placeholder="Enter your GSTIN"
        value={businessGSTIN}
        onChange={e => setBusinessGSTIN(e.target.value)}
      />
    </label>


<label>
  Company logo
  <input
    type="file"
    accept="image/png,image/jpeg,image/webp"
    onChange={e => {
      const file = e.target.files?.[0]
      if (!file) return

      if (file.size > 2 * 1024 * 1024) {
        alert('Please select an image smaller than 2 MB.')
        e.target.value = ''
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBusinessLogo(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }}
  />
</label>

{businessLogo && (
  <img
    src={businessLogo}
    alt="Business logo"
    style={{ width: 110, height: 70, objectFit: 'contain' }}
  />
)}


    <label>
      Business address
      <input
        placeholder="Enter your business address"
        value={businessAddress}
        onChange={e => setBusinessAddress(e.target.value)}
      />
    </label>
  </div>
</div>



            <div className="editor-card">
              <h2>Quotation details</h2>

              <div className="form-grid">
                <label>
                  Quotation number
                  <input
                    value={quoteNumber}
                    onChange={e => setQuoteNumber(e.target.value)}
                  />
                </label>

                <label>
                  Quotation date
                  <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                </label>

                <label>
                  Valid until
                  <input type="date" />
                </label>
              </div>
            </div>

            <div className="editor-card">
              <h2>Customer details</h2>

              <div className="form-grid">
                <label>
                  Customer / Company name
                  <input
                    placeholder="Enter customer name"
                    value={customer}
                    onChange={e => setCustomer(e.target.value)}
                  />
                </label>

                <label>
                  Customer email
                  <input
                    type="email"
                    placeholder="customer@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="editor-card">
              <h2>Items & services</h2>

              <div className="item-table">
                <div className="item-header">
                  <span>Description</span>
                  <span>Quantity</span>
                  <span>Unit price (₹)</span>
                  <span>Amount</span>
                  <span></span>
                </div>

                {items.map(item => (
                  <div className="item-row" key={item.id}>
                    <input
                      placeholder="Product or service"
                      value={item.description}
                      onChange={e =>
                        updateItem(item.id, 'description', e.target.value)
                      }
                    />

                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={e =>
                        updateItem(item.id, 'quantity', e.target.value)
                      }
                    />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={e =>
                        updateItem(item.id, 'price', e.target.value)
                      }
                    />

                    <strong>{money(item.quantity * item.price)}</strong>

                    <button
                      className="remove-button"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      title="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button className="secondary-button add-item" onClick={addItem}>
                + Add item
              </button>
            </div>

            <div className="editor-card totals-card">
              <label>
                GST rate
                <select
                  value={gst}
                  onChange={e => setGst(Number(e.target.value))}
                >
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </label>

              <div className="totals">
                <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                <div><span>GST ({gst}%)</span><strong>{money(tax)}</strong></div>
                <div className="grand-total">
                  <span>Grand total</span>
                  <strong>{money(grandTotal)}</strong>
                </div>
              </div>
            </div>

<QuotationPreview
  quoteNumber={quoteNumber}
  customer={customer}
  email={email}
  items={items}
  gst={gst}
  subtotal={subtotal}
  tax={tax}
  grandTotal={grandTotal}
  businessName={businessName}
businessAddress={businessAddress}
businessEmail={businessEmail}
businessPhone={businessPhone}
businessGSTIN={businessGSTIN}
businessLogo={businessLogo}
/>

            <div className="editor-actions">
              <button
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="primary-button"
                onClick={() => window.alert(
                  `Quotation ${quoteNumber}\nCustomer: ${customer || 'Not entered'}\nEmail: ${email || 'Not entered'}\nTotal: ${money(grandTotal)}`
                )}
              >
                Save quotation
              </button>
            </div>
          </section>
        ) : (
          <>
            <section className="welcome">
              <div>
                <p className="eyebrow">YOUR BUSINESS, SIMPLIFIED</p>
                <h1>Good morning 👋</h1>
                <p className="subtitle">
                  Create professional quotations in minutes.
                </p>
              </div>

              <button
                className="primary-button"
                onClick={() => setShowForm(true)}
              >
                + Create quotation
              </button>
            </section>

            <section className="stats">
              <div className="stat-card">
                <span>Total quotations</span>
                <h2>0</h2>
                <small>All your quotations</small>
              </div>
              <div className="stat-card">
                <span>Accepted</span>
                <h2>0</h2>
                <small>Successfully approved</small>
              </div>
              <div className="stat-card">
                <span>Pending</span>
                <h2>0</h2>
                <small>Awaiting a response</small>
              </div>
              <div className="stat-card">
                <span>Total value</span>
                <h2>₹0.00</h2>
                <small>Quotation value</small>
              </div>
            </section>

            <section className="recent-section">
              <div className="section-heading">
                <div>
                  <h2>Recent quotations</h2>
                  <p>Your latest business quotations will appear here.</p>
                </div>
                <a href="#quotations">View all →</a>
              </div>

              <div className="empty-state">
                <div className="empty-icon">▤</div>
                <h3>No quotations yet</h3>
                <p>Create your first quotation and make your business look professional.</p>
                <button
                  className="secondary-button"
                  onClick={() => setShowForm(true)}
                >
                  Create your first quotation
                </button>
              </div>
            </section>
          </>
        )}

        <footer>
          <span>QuoteCraft © 2026</span>
          <span>Professional quotations. Made simple.</span>
        </footer>
      </main>
    </div>
  )
}

export default App
