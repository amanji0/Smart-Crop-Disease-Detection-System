import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Tractor, User, Loader2 } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Howdy partner! I'm yer friendly Farm Assistant. What can I help y'all with out in the fields today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Farmer-themed Rule-based engine
    setTimeout(() => {
      let botResponse = "Well shoot, I reckon I didn't quite catch that over the sound of the tractor. Could ya rephrase? I can help ya with crops, sick plants, weather, or yer account.";
      const lowerInput = userMessage.text.toLowerCase();

      if (lowerInput.includes('delete') && (lowerInput.includes('account') || lowerInput.includes('profile'))) {
        botResponse = "Well I'll be! If you're lookin' to pack up and leave, click your Profile icon up yonder. Head to the 'Advanced' tab, and you'll find the 'Delete Account' button down in the Danger Zone.";
      } else if (lowerInput.includes('crop') || lowerInput.includes('recommendation')) {
        botResponse = "Lookin' for a good harvest? Head on down to the 'Features' section and click 'Crop Recommendation'. Tell me your city, and I'll reckon the best crop for your soil and weather!";
      } else if (lowerInput.includes('disease') || lowerInput.includes('sick') || lowerInput.includes('cure')) {
        botResponse = "Got a sick plant? Don't fret! Snap a clear picture of that ailing leaf and upload it to our 'Disease Detection' tool. I'll take a gander and tell ya exactly how to nurse it back to health.";
      } else if (lowerInput.includes('weather') || lowerInput.includes('rain') || lowerInput.includes('temperature')) {
        botResponse = "Wonderin' if you should water the fields? Check the 'Weather Alerts' feature for a trusty 5-day forecast, straight from the clouds to your screen.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi ') || lowerInput === 'hi' || lowerInput.includes('howdy')) {
        botResponse = "Howdy there! Ready to get your hands dirty? How can I lend a hand on the farm today?";
      } else if (lowerInput.includes('password') || lowerInput.includes('login')) {
        botResponse = "Need help unlockin' the barn door? Click the 'Login / Sign Up' button up top. We use a secure OTP email code instead of passwords to keep the coyotes out!";
      } else if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('contact')) {
        botResponse = "Need to holler at the farm hands? Just send a pigeon—er, an email—to support@smartcrop.com. We'll get back to ya before the rooster crows!";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #059669, #34d399)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 24px rgba(52, 211, 153, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'scale(0)' : 'scale(1)',
        }}
      >
        <MessageCircle size={28} strokeWidth={1.5} />
      </button>

      {/* Chat Window */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '350px',
          height: '500px',
          maxWidth: 'calc(100vw - 48px)',
          maxHeight: 'calc(100vh - 48px)',
          background: 'var(--bg-secondary)',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 9999,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0) translateY(100px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transformOrigin: 'bottom right'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Tractor size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Farm Assistant</h3>
              <p style={{ fontSize: '0.75rem', color: '#10b981', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} /> In the field
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Message History */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
              gap: '8px',
              alignItems: 'flex-end'
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                background: msg.sender === 'user' ? 'var(--bg-tertiary)' : 'rgba(52, 211, 153, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: msg.sender === 'user' ? 'var(--text-secondary)' : '#10b981'
              }}>
                {msg.sender === 'user' ? <User size={14} /> : <Tractor size={14} />}
              </div>
              <div style={{
                background: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--bg-tertiary)',
                color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                padding: '10px 14px',
                borderRadius: '16px',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                maxWidth: '75%',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                <Tractor size={14} />
              </div>
              <div style={{ background: 'var(--bg-tertiary)', padding: '10px 14px', borderRadius: '16px', borderBottomLeftRadius: '4px', display: 'flex', gap: '4px' }}>
                <Loader2 size={16} className="animate-spin" color="var(--text-secondary)" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-tertiary)'
        }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Holler somethin'..."
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '20px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: input.trim() ? 'var(--color-primary)' : 'var(--bg-secondary)',
                color: input.trim() ? 'white' : 'var(--text-muted)',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              <Send size={18} style={{ marginLeft: '-2px' }} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
