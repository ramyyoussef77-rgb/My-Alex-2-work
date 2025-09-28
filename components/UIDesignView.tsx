import React from 'react';
import { Section } from './Section';
import { CodeBlock } from './CodeBlock';
import { FinalCelebration } from './FinalCelebration';

const ColorSwatch = ({ hex, name, role }: { hex: string, name: string, role: string }) => (
    <div className="flex items-center space-x-4 bg-slate-900/50 p-3 rounded-lg border border-slate-700">
        <div className="w-12 h-12 rounded-full shadow-lg border-2 border-slate-600" style={{ backgroundColor: hex }}></div>
        <div>
            <div className="font-semibold text-slate-200">{name}</div>
            <div className="text-sm text-slate-400">{role}</div>
            <div className="text-xs text-slate-500 font-mono mt-1">{hex}</div>
        </div>
    </div>
);

const ScreenMockup = ({ title, description, imgSrc, elements }: { title: string, description: string, imgSrc: string, elements: string[] }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
        <h3 className="font-bold text-lg text-pink-400 mb-3">{title}</h3>
        <p className="text-sm text-slate-400 mb-4">{description}</p>
        <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="bg-black rounded-xl p-2 border border-slate-600 shadow-2xl">
                 <img src={imgSrc} alt={`${title} mockup`} className="rounded-lg w-full" />
            </div>
            <ul className="list-disc list-inside text-slate-400 space-y-2 text-sm">
                {elements.map((el, i) => <li key={i}>{el}</li>)}
            </ul>
        </div>
    </div>
);

const ChecklistItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start space-x-3">
        <span className="text-green-400 mt-1">✅</span>
        <span className="text-slate-300">{children}</span>
    </li>
);

const cardComponentCode = `// src/components/Card.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937', // Use dark theme color
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#334155', // Dark border
    // Shadow props might need adjustment for dark theme visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F3F4F6', // Light text for dark background
    marginBottom: 8,
  },
});

export default Card;`;

const buttonComponentCode = `// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, variant = 'primary', disabled }) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#1E3A8A',
  },
  secondary: {
    backgroundColor: '#F59E0B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;`;

const offlineIndicatorCode = `// src/components/OfflineIndicator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OfflineIndicator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>☁️ Offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(245, 158, 11, 0.9)', // Sunset Gold with opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#1F2937',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default OfflineIndicator;`;

const skeletonCode = `// Show skeleton while fetching data
import SkeletonContent from 'react-native-skeleton-content';

<SkeletonContent
  containerStyle={{ flex: 1, width: '100%' }}
  boneColor="#334155"
  highlightColor="#475569"
  isLoading={loading}
  layout={[
    { width: '80%', height: 30, marginBottom: 10 },
    { width: '100%', height: 100, marginBottom: 6 },
    { width: '100%', height: 30, marginBottom: 6 },
  ]}
/>`;

export const UIDesignView: React.FC = () => (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
        <main className="max-w-7xl mx-auto space-y-12">
            <header className="text-center py-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                My Alex App: Polished UI/UX Design System
              </h1>
              <p className="mt-2 text-lg text-slate-400">
                Transforming n8n-powered intelligence into a visually stunning, user-friendly experience.
              </p>
            </header>

            <Section step={1} title="UI/UX Design System (Alexandria Theme)" emoji="🌊">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ColorSwatch hex="#1E3A8A" name="Mediterranean Deep Blue" role="Primary Color - Headers, buttons, accents" />
                    <ColorSwatch hex="#F59E0B" name="Sunset Gold" role="Secondary Color - Highlights, CTAs" />
                    <ColorSwatch hex="#059669" name="Bibliotheca Green" role="Accent Color - Historical eras, nature" />
                    <ColorSwatch hex="#F3F4F6" name="Soft Off-White" role="Background - Clean, readable canvas" />
                    <ColorSwatch hex="#1F2937" name="Dark Charcoal" role="Text Color - High contrast for readability" />
                </div>
            </Section>

            <Section step={2} title="Realistic Screen Mockups" emoji="📱">
                <div className="space-y-8">
                    <ScreenMockup
                        title="🌅 Screen 1: Splash / Onboarding"
                        description="Like the surf app’s first screen, creating an immersive, welcoming entry point."
                        imgSrc="https://via.placeholder.com/300x600/1E3A8A/FFFFFF?text=My+Alex+%0A%0A%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B+%D9%81%D9%8A+%D8%A7%D9%84%D8%A5%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9"
                        elements={[
                            "Full-screen dynamic background video of Corniche sunset with waves.",
                            "Simple, elegant circular logo with an Alexandria lighthouse motif.",
                            "Tagline: “Your AI guide to the soul of Alexandria” in both English and Arabic.",
                            "Gentle wave motion animation on the background and a fade-in for the logo."
                        ]}
                    />
                     <ScreenMockup
                        title="🗺️ Screen 2: Home Dashboard"
                        description="Like the surf app’s main selection screen, providing contextual info and clear actions."
                        imgSrc="https://via.placeholder.com/300x600/F3F4F6/1F2937?text=Good+evening+from+the+Corniche"
                        elements={[
                            "Top Bar: Greeting ('Good evening'), Location ('📍 Corniche'), and a subtle cloud icon for offline status.",
                            "Primary CTA: Large, friendly blue button “🗣️ Ask My Alex”.",
                            "Quick Action Cards: “🏛️ History Near Me”, “📅 What’s Happening?”, “👥 Connect with Neighbors”.",
                            "Featured Event Card: “AI-Predicted: Poetry Reading at Bibliotheca tonight”."
                        ]}
                    />
                    <ScreenMockup
                        title="🕰️ Screen 3: Historical AR Overlay"
                        description="Like the surf app’s live camera view, offering a clean, immersive experience."
                        imgSrc="https://via.placeholder.com/300x600/000000/FFFFFF?text=AR+View+-+Pompey's+Pillar"
                        elements={[
                            "Full-screen camera feed with a semi-transparent, minimal UI.",
                            "Bottom Time Slider with era labels: Ptolemaic, Roman, Islamic, Modern. A gold indicator highlights the selected era.",
                            "Tap an AR object to reveal an elegant 'Era Card' with narration text and a play button.",
                            "A small badge appears if a personal memory is tied to the location: “You were here last Friday”."
                        ]}
                    />
                     <ScreenMockup
                        title="💬 Screen 4: Cultural Chat"
                        description="Like the surf app’s live comments, but designed for intelligent conversation."
                        imgSrc="https://via.placeholder.com/300x600/F3F4F6/1F2937?text=Chat+Interface"
                        elements={[
                            "User messages are right-aligned; AI messages are left-aligned with a landmark avatar.",
                            "Smart suggestion chips appear above the text input based on context.",
                            "A small cultural context badge (e.g., 🌙 for Ramadan) appears next to relevant AI responses."
                        ]}
                    />
                </div>
            </Section>

            <Section step={3} title="Component Library (Reusable UI Elements)" emoji="🧩">
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-pink-400 mb-2">Card Component</h3>
                        <CodeBlock code={cardComponentCode} />
                    </div>
                     <div>
                        <h3 className="font-semibold text-pink-400 mb-2">Button Component</h3>
                        <CodeBlock code={buttonComponentCode} />
                    </div>
                     <div>
                        <h3 className="font-semibold text-pink-400 mb-2">Offline Indicator</h3>
                        <CodeBlock code={offlineIndicatorCode} />
                    </div>
                </div>
            </Section>

             <Section step={4} title="Realistic Assets" emoji="🖼️">
                 <div className="grid md:grid-cols-3 gap-6 text-slate-400">
                    <div>
                        <h3 className="font-bold text-lg text-pink-400 mb-2">High-Quality Images</h3>
                        <p>Use authentic Alexandria photos from Unsplash or Pexels for splash screens and backgrounds.</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg text-pink-400 mb-2">Icons</h3>
                        <p>Use a professional icon set like Feather Icons or Ionicons, with custom SVGs for local landmarks.</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg text-pink-400 mb-2">Fonts</h3>
                        <p>Use Google Fonts: **Cairo** for beautiful Arabic RTL support and **Inter** for clean, modern English text.</p>
                    </div>
                </div>
            </Section>
            
            <Section step={5} title="Polish with Micro-Interactions" emoji="✨">
                 <p className="mb-4 text-slate-400">Add subtle animations to make the app feel alive and responsive. Use skeleton loaders for a smooth data-fetching experience.</p>
                 <CodeBlock code={skeletonCode} />
            </Section>

            <Section step={6} title="Final Checklist: Does It Look Like a Real App?" emoji="🎯">
                <ul className="space-y-3">
                    <ChecklistItem><strong>Consistent design system</strong> (colors, fonts, spacing)</ChecklistItem>
                    <ChecklistItem><strong>Professional mockups</strong> for all key screens</ChecklistItem>
                    <ChecklistItem><strong>Realistic assets</strong> (photos, icons, fonts)</ChecklistItem>
                    <ChecklistItem><strong>Micro-interactions</strong> (animations, loading states)</ChecklistItem>
                    <ChecklistItem><strong>Polished components</strong> (cards, buttons, indicators)</ChecklistItem>
                    <ChecklistItem><strong>Cultural authenticity</strong> (Alexandria-specific visuals and tone)</ChecklistItem>
                </ul>
            </Section>

             <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg text-center">
                <p className="text-2xl text-slate-200 italic">
                     You’re applying the same efficiency of n8n to UI/UX design — transforming your powerful backend into a visually stunning, culturally resonant, real-world app that Alexandrians will love.
                </p>
            </div>

            <FinalCelebration />
        </main>
        <footer className="text-center py-8 mt-12 text-slate-500">
            Generated by AI for workflow automation analysis.
        </footer>
    </div>
);