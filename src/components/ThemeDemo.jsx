import React, { useState } from 'react';
import useTheme from '../hooks/useTheme';

const ThemeDemo = () => {
  const {
    theme,
    setTheme,
    setColor,
    currentColor,
    colorHistory,
    getLightnessFromHex,
    isValidHexColor,
    hexToRgb,
    getComplementaryColor,
    adjustColorBrightness,
    resetTheme,
    applyColorFromHistory,
  } = useTheme();

  const [customHex, setCustomHex] = useState('#ff6b6b');
  const [brightnessAdjustment, setBrightnessAdjustment] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');

  // Demo data
  const demoColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
  ];

  const colorPresets = [
    { name: 'Ocean Blue', color: '#0077be', description: 'Professional and trustworthy' },
    { name: 'Forest Green', color: '#228b22', description: 'Natural and calming' },
    { name: 'Sunset Orange', color: '#ff6347', description: 'Energetic and warm' },
    { name: 'Royal Purple', color: '#6a0dad', description: 'Creative and luxurious' },
    { name: 'Cherry Red', color: '#dc143c', description: 'Bold and passionate' },
    { name: 'Golden Yellow', color: '#ffd700', description: 'Optimistic and cheerful' }
  ];

  // Event handlers
  const handleColorChange = (e) => {
    setColor(e.target);
  };

  const handleCustomHexSubmit = (e) => {
    e.preventDefault();
    if (isValidHexColor(customHex)) {
      const mockInput = { value: customHex };
      setColor(mockInput);
    } else {
      alert('Please enter a valid hex color (e.g., #ff6b6b or #f6b)');
    }
  };

  const applyPresetColor = (color) => {
    const mockInput = { value: color };
    setColor(mockInput);
  };

  const applyBrightnessAdjustment = () => {
    const adjustedColor = adjustColorBrightness(currentColor, brightnessAdjustment);
    const mockInput = { value: adjustedColor };
    setColor(mockInput);
  };

  const applyComplementaryColor = () => {
    const complementary = getComplementaryColor(currentColor);
    const mockInput = { value: complementary };
    setColor(mockInput);
  };

  // Utility functions
  const lightness = getLightnessFromHex(currentColor);
  const rgb = hexToRgb(currentColor);

  // Navigation sections
  const sections = [
    { id: 'overview', title: '🏠 Overview', icon: '🏠' },
    { id: 'controls', title: '🎛️ Theme Controls', icon: '🎛️' },
    { id: 'components', title: '🧩 UI Components', icon: '🧩' },
    { id: 'layouts', title: '📐 Layouts', icon: '📐' },
    { id: 'typography', title: '📝 Typography', icon: '📝' },
    { id: 'colors', title: '🎨 Color System', icon: '🎨' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--base-color)',
      color: 'var(--text-color)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--surface-color)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '1rem 0'
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    navButton: (isActive) => ({
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: isActive ? 'var(--brand-color)' : 'transparent',
      color: isActive ? 'white' : 'var(--text-color)',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      opacity: isActive ? 1 : 0.8
    }),
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    section: {
      marginBottom: '3rem'
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: 'var(--brand-color)',
      textAlign: 'center'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    card: {
      padding: '1.5rem',
      backgroundColor: 'var(--surface-color)',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: 'var(--brand-color)'
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'var(--brand-color)',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    input: {
      padding: '0.75rem',
      borderRadius: '8px',
      border: '2px solid rgba(255,255,255,0.2)',
      backgroundColor: 'var(--base-color)',
      color: 'var(--text-color)',
      fontSize: '1rem',
      width: '100%'
    }
  };

  const renderOverview = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🎨 Enhanced Theme System Demo</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📊 Current Theme Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div><strong>Theme Mode:</strong> {theme}</div>
            <div><strong>Base Color:</strong> {currentColor}</div>
            <div><strong>Lightness:</strong> {lightness.toFixed(1)}%</div>
            <div><strong>RGB Values:</strong> R:{rgb.r}, G:{rgb.g}, B:{rgb.b}</div>
            <div><strong>Text Contrast:</strong> {lightness > 20 ? 'Dark text on light' : 'Light text on dark'}</div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🚀 Key Features</h3>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li>Dynamic color theming with automatic contrast</li>
            <li>Persistent theme preferences</li>
            <li>Color history tracking</li>
            <li>Advanced color utilities</li>
            <li>Responsive design system</li>
            <li>Performance optimized</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎯 Demo Sections</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sections.slice(1).map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  ...styles.button,
                  backgroundColor: 'transparent',
                  color: 'var(--text-color)',
                  border: '1px solid var(--brand-color)',
                  textAlign: 'left'
                }}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderControls = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🎛️ Theme Controls</h2>
      <div style={styles.grid}>
        {/* Basic Color Picker */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎯 Color Picker</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="color"
              value={currentColor}
              onChange={handleColorChange}
              style={{
                width: '100%',
                height: '60px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            />
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
              Click to choose a color and see the theme update automatically
            </p>
          </div>
        </div>

        {/* Custom Hex Input */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>✏️ Custom Hex Input</h3>
          <form onSubmit={handleCustomHexSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              placeholder="#ff6b6b"
              style={{
                ...styles.input,
                borderColor: isValidHexColor(customHex) ? 'var(--brand-color)' : '#ff4757'
              }}
            />
            <button
              type="submit"
              disabled={!isValidHexColor(customHex)}
              style={{
                ...styles.button,
                backgroundColor: isValidHexColor(customHex) ? 'var(--brand-color)' : '#666',
                cursor: isValidHexColor(customHex) ? 'pointer' : 'not-allowed'
              }}
            >
              Apply Color
            </button>
          </form>
        </div>

        {/* Theme Mode Toggle */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🌓 Theme Mode</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setTheme('light')}
                style={{
                  ...styles.button,
                  flex: 1,
                  backgroundColor: theme === 'light' ? 'var(--brand-color)' : 'transparent',
                  border: `2px solid ${theme === 'light' ? 'var(--brand-color)' : 'rgba(255,255,255,0.3)'}`
                }}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                style={{
                  ...styles.button,
                  flex: 1,
                  backgroundColor: theme === 'dark' ? 'var(--brand-color)' : 'transparent',
                  border: `2px solid ${theme === 'dark' ? 'var(--brand-color)' : 'rgba(255,255,255,0.3)'}`
                }}
              >
                🌙 Dark
              </button>
            </div>
            <button
              onClick={resetTheme}
              style={{
                ...styles.button,
                backgroundColor: '#ff4757'
              }}
            >
              🔄 Reset to Default
            </button>
          </div>
        </div>

        {/* Color Presets */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎨 Color Presets</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
            {colorPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPresetColor(preset.color)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: currentColor === preset.color ? '3px solid var(--brand-color)' : '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: preset.color,
                  color: getLightnessFromHex(preset.color) > 50 ? 'black' : 'white',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Color History */}
        {colorHistory.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📚 Color History</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
              gap: '0.5rem'
            }}>
              {colorHistory.map((color, index) => (
                <button
                  key={index}
                  onClick={() => applyColorFromHistory(color)}
                  style={{
                    aspectRatio: '1',
                    backgroundColor: color,
                    border: currentColor === color ? '3px solid var(--brand-color)' : '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    minHeight: '50px',
                    fontSize: '0.7rem',
                    color: getLightnessFromHex(color) > 50 ? 'black' : 'white',
                    fontWeight: '600'
                  }}
                  title={`Apply ${color}`}
                >
                  {color.substring(1, 4).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Tools */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🔧 Advanced Tools</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Brightness: {brightnessAdjustment > 0 ? '+' : ''}{brightnessAdjustment}%
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={brightnessAdjustment}
                onChange={(e) => setBrightnessAdjustment(parseInt(e.target.value))}
                style={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    flex: 1,
                    height: '30px',
                    backgroundColor: currentColor,
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  title="Current Color"
                />
                <div
                  style={{
                    flex: 1,
                    height: '30px',
                    backgroundColor: adjustColorBrightness(currentColor, brightnessAdjustment),
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  title="Adjusted Color"
                />
              </div>
              <button
                onClick={applyBrightnessAdjustment}
                style={styles.button}
              >
                Apply Brightness
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div
                  style={{
                    height: '40px',
                    backgroundColor: currentColor,
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    marginBottom: '0.5rem'
                  }}
                />
                <small>Current</small>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div
                  style={{
                    height: '40px',
                    backgroundColor: getComplementaryColor(currentColor),
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    marginBottom: '0.5rem'
                  }}
                />
                <small>Complementary</small>
              </div>
            </div>
            <button
              onClick={applyComplementaryColor}
              style={styles.button}
            >
              Apply Complementary
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComponents = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🧩 UI Components Showcase</h2>
      <div style={styles.grid}>
        {/* Buttons */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🔘 Buttons</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button style={styles.button}>Primary Button</button>
            <button style={{
              ...styles.button,
              backgroundColor: 'transparent',
              border: '2px solid var(--brand-color)',
              color: 'var(--brand-color)'
            }}>
              Secondary Button
            </button>
            <button style={{
              ...styles.button,
              backgroundColor: '#ff4757'
            }}>
              Danger Button
            </button>
            <button style={{
              ...styles.button,
              backgroundColor: '#2ed573'
            }}>
              Success Button
            </button>
          </div>
        </div>

        {/* Form Elements */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📝 Form Elements</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Text input"
              style={styles.input}
            />
            <textarea
              placeholder="Textarea"
              rows="3"
              style={{
                ...styles.input,
                resize: 'vertical'
              }}
            />
            <select style={styles.input}>
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" />
              Checkbox option
            </label>
          </div>
        </div>

        {/* Cards */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🃏 Card Variations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--base-color)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--brand-color)' }}>Base Card</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Uses base color background</p>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--brand-color)',
              borderRadius: '8px',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Brand Card</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Uses brand color background</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🧭 Navigation</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <nav style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.5rem',
              backgroundColor: 'var(--base-color)',
              borderRadius: '8px'
            }}>
              <a href="#" style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                backgroundColor: 'var(--brand-color)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}>
                Active
              </a>
              <a href="#" style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}>
                Link
              </a>
              <a href="#" style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}>
                Link
              </a>
            </nav>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <a href="#" style={{
                padding: '0.75rem',
                borderRadius: '6px',
                backgroundColor: 'var(--brand-color)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}>
                📊 Dashboard
              </a>
              <a href="#" style={{
                padding: '0.75rem',
                borderRadius: '6px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}>
                👥 Users
              </a>
              <a href="#" style={{
                padding: '0.75rem',
                borderRadius: '6px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}>
                ⚙️ Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayouts = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>📐 Layout Demonstrations</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Grid Layout */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📊 Grid Layout</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div
                key={num}
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--base-color)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Grid {num}
              </div>
            ))}
          </div>
        </div>

        {/* Flexbox Layout */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📏 Flexbox Layout</h3>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flex: '1 1 200px',
              padding: '1.5rem',
              backgroundColor: 'var(--base-color)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--brand-color)' }}>Flex Item 1</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Flexible content area</p>
            </div>
            <div style={{
              flex: '2 1 300px',
              padding: '1.5rem',
              backgroundColor: 'var(--base-color)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--brand-color)' }}>Flex Item 2</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>This item takes more space</p>
            </div>
            <div style={{
              flex: '1 1 200px',
              padding: '1.5rem',
              backgroundColor: 'var(--base-color)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--brand-color)' }}>Flex Item 3</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Another flexible area</p>
            </div>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📱 Dashboard Layout</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gridTemplateRows: '60px 1fr',
            gap: '1rem',
            height: '400px'
          }}>
            <div style={{
              gridColumn: '1 / -1',
              padding: '1rem',
              backgroundColor: 'var(--brand-color)',
              borderRadius: '8px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h4 style={{ margin: 0 }}>Dashboard Header</h4>
              <div>🔔 👤</div>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--base-color)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h5 style={{ margin: '0 0 1rem 0', color: 'var(--brand-color)' }}>Sidebar</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: 'var(--brand-color)', color: 'white' }}>
                  📊 Analytics
                </div>
                <div style={{ padding: '0.5rem', borderRadius: '4px' }}>📈 Reports</div>
                <div style={{ padding: '0.5rem', borderRadius: '4px' }}>⚙️ Settings</div>
              </div>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--base-color)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'auto'
            }}>
              <h5 style={{ margin: '0 0 1rem 0', color: 'var(--brand-color)' }}>Main Content</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                {[1, 2, 3, 4].map(num => (
                  <div
                    key={num}
                    style={{
                      padding: '1rem',
                      backgroundColor: 'var(--surface-color)',
                      borderRadius: '6px',
                      textAlign: 'center'
                    }}
                  >
                    Card {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTypography = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>📝 Typography System</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📏 Headings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1 style={{ margin: 0, color: 'var(--brand-color)' }}>Heading 1</h1>
            <h2 style={{ margin: 0, color: 'var(--brand-color)' }}>Heading 2</h2>
            <h3 style={{ margin: 0, color: 'var(--brand-color)' }}>Heading 3</h3>
            <h4 style={{ margin: 0, color: 'var(--brand-color)' }}>Heading 4</h4>
            <h5 style={{ margin: 0, color: 'var(--brand-color)' }}>Heading 5</h5>
            <h6 style={{ margin: 0, color: 'var(--brand-color)' }}>Heading 6</h6>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📄 Text Styles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Large paragraph text for emphasis</p>
            <p style={{ margin: 0 }}>Regular paragraph text for body content</p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Small text for captions and notes</p>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Bold text for emphasis</p>
            <p style={{ margin: 0, fontStyle: 'italic' }}>Italic text for quotes</p>
            <p style={{ margin: 0, textDecoration: 'underline' }}>Underlined text for links</p>
            <code style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: 'var(--base-color)',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>
              Code text
            </code>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📋 Lists</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--brand-color)' }}>Unordered List</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--brand-color)' }}>Ordered List</h4>
              <ol style={{ paddingLeft: '1.5rem' }}>
                <li>First step</li>
                <li>Second step</li>
                <li>Third step</li>
              </ol>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>💬 Quotes & Callouts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <blockquote style={{
              margin: 0,
              padding: '1rem',
              borderLeft: '4px solid var(--brand-color)',
              backgroundColor: 'var(--base-color)',
              fontStyle: 'italic'
            }}>
              "This is a blockquote example showing how quoted text appears in the theme."
            </blockquote>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--brand-color)',
              color: 'white',
              borderRadius: '8px'
            }}>
              <strong>💡 Pro Tip:</strong> This is a callout box for important information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderColors = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🎨 Color System</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎯 Primary Colors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--base-color)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }} />
              <div>
                <div style={{ fontWeight: '600' }}>Base Color</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{currentColor}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--surface-color)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }} />
              <div>
                <div style={{ fontWeight: '600' }}>Surface Color</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Derived from base</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--brand-color)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }} />
              <div>
                <div style={{ fontWeight: '600' }}>Brand Color</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Enhanced base</div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📊 Color Analysis</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Lightness Analysis</div>
              <div style={{
                height: '20px',
                backgroundColor: 'var(--base-color)',
                borderRadius: '10px',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  position: 'absolute',
                  left: `${lightness}%`,
                  top: '-5px',
                  width: '10px',
                  height: '30px',
                  backgroundColor: 'var(--brand-color)',
                  borderRadius: '5px'
                }} />
              </div>
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {lightness.toFixed(1)}% lightness
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>RGB Breakdown</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: '40px',
                    backgroundColor: `rgb(${rgb.r}, 0, 0)`,
                    borderRadius: '4px',
                    marginBottom: '0.25rem'
                  }} />
                  <small>R: {rgb.r}</small>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: '40px',
                    backgroundColor: `rgb(0, ${rgb.g}, 0)`,
                    borderRadius: '4px',
                    marginBottom: '0.25rem'
                  }} />
                  <small>G: {rgb.g}</small>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: '40px',
                    backgroundColor: `rgb(0, 0, ${rgb.b})`,
                    borderRadius: '4px',
                    marginBottom: '0.25rem'
                  }} />
                  <small>B: {rgb.b}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🌈 Color Variations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[-40, -20, 0, 20, 40].map(adjustment => (
              <div key={adjustment} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: adjustColorBrightness(currentColor, adjustment),
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }} />
                <div>
                  <div style={{ fontWeight: '600' }}>
                    {adjustment === 0 ? 'Original' : `${adjustment > 0 ? '+' : ''}${adjustment}%`}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    {adjustColorBrightness(currentColor, adjustment)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🔄 Color Relationships</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: currentColor,
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)'
              }} />
              <div>
                <div style={{ fontWeight: '600' }}>Current Color</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{currentColor}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: getComplementaryColor(currentColor),
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)'
              }} />
              <div>
                <div style={{ fontWeight: '600' }}>Complementary</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  {getComplementaryColor(currentColor)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'controls': return renderControls();
      case 'components': return renderComponents();
      case 'layouts': return renderLayouts();
      case 'typography': return renderTypography();
      case 'colors': return renderColors();
      default: return renderOverview();
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={styles.navButton(activeSection === section.id)}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </header>
      <main style={styles.main}>
        {renderSection()}
      </main>
    </div>
  );
};

export default ThemeDemo;