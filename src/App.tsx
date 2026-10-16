import React, { useState } from 'react';
import {
  CalendarDays,
  MessageCircle,
  Star,
  Clock,
  MapPin,
  Car,
  Phone,
  Mail,
  Info,
  Menu,
  X,
  ScanLine,
  Layers,
  Building2,
  Instagram,
  Facebook,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { VertexGlyph } from './components/VertexGlyph.tsx';

// Doctor initials monogram with vertex frame
const DoctorMonogram: React.FC<{ initials: string }> = ({ initials }) => {
  return (
    <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
      <VertexGlyph
        size={44}
        strokeWidth={1.5}
        color="#00B4D8"
        className="absolute inset-0"
      />
      <span className="relative z-10 font-display text-white text-xs font-semibold tracking-wider pt-1">
        {initials}
      </span>
    </div>
  );
};

// Fallback Logo Component
const LogoBrand: React.FC<{ className?: string; imgClassName?: string }> = ({
  className = '',
  imgClassName = 'h-10 md:h-[52px] object-contain',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`bg-primary inline-flex items-center ${className}`}>
      {!hasError ? (
        <img
          src="https://assensus.cl/assets/logo.png"
          alt="Assensus Clínica Dental"
          className={imgClassName}
          loading="eager"
          // @ts-expect-error fetchpriority is supported in modern browsers
          fetchpriority="high"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex flex-col justify-center">
          <span className="font-display font-semibold text-white tracking-[0.3em] text-lg md:text-xl leading-none">
            ASSENSUS
          </span>
          <span className="font-sans text-[10px] tracking-[0.2em] text-white/80 uppercase mt-1 leading-none">
            CLÍNICA ODONTOLÓGICA
          </span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    tratamiento: 'Invisalign®',
    urgencia: 'No',
    horario: 'Mañana',
    mensaje: '',
  });
  const [formError, setFormError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      setFormError('Por favor ingresa tu nombre');
      return;
    }
    setFormError('');

    const urgenciaTexto =
      formData.urgencia === 'Sí' ? 'Es una urgencia. ' : '';
    const mensajeTexto = formData.mensaje.trim()
      ? ` ${formData.mensaje.trim()}`
      : '';
    const mensajeCompleto = `Hola Assensus, soy ${formData.nombre.trim()}. Me interesa: ${formData.tratamiento}. ${urgenciaTexto}Horario preferido: ${formData.horario}.${mensajeTexto}`;

    const url = `https://wa.me/56966707209?text=${encodeURIComponent(mensajeCompleto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  // Title words for hero animation
  const heroTitleWords = [
    'Tu',
    'nueva',
    'sonrisa,',
    'planificada',
    'antes',
    'de',
    'empezar.',
  ];

  return (
    <div className="min-h-screen bg-surface text-ink flex flex-col font-sans selection:bg-secondary selection:text-ink">
      {/* 
        HEADER
        Fixed at top, bg-primary, with 2px cyan line underneath 
      */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-primary shadow-md">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            className="flex items-center focus:outline-none"
            aria-label="Assensus Clínica Dental - Inicio"
          >
            <LogoBrand />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#tratamientos"
              className="text-white/85 hover:text-secondary text-sm font-medium transition-colors"
            >
              Tratamientos
            </a>
            <a
              href="#equipo"
              className="text-white/85 hover:text-secondary text-sm font-medium transition-colors"
            >
              Equipo
            </a>
            <a
              href="#urgencias"
              className="text-white/85 hover:text-secondary text-sm font-medium transition-colors"
            >
              Urgencias
            </a>
            <a
              href="#contacto"
              className="text-white/85 hover:text-secondary text-sm font-medium transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://reserva.dentalqub.cl/assensus"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-secondary text-white hover:bg-secondary hover:text-ink font-semibold text-sm px-5 py-2.5 rounded-full transition-colors inline-flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4 text-secondary" />
              <span>Agendar hora</span>
            </a>
          </div>

          {/* Mobile Right Controls: "Agendar hora" with visible text + Menu button */}
          <div className="flex lg:hidden items-center gap-2.5">
            <a
              href="https://reserva.dentalqub.cl/assensus"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-ink font-semibold text-xs px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm active:opacity-90"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Agendar hora</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none rounded-lg"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-secondary" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* 2px cyan line under header */}
        <div className="h-[2px] w-full bg-secondary" />

        {/* Mobile Fullscreen Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[66px] bottom-0 bg-primary z-50 overflow-y-auto px-6 py-8 flex flex-col justify-between">
            <div className="flex flex-col gap-6 pt-4">
              <a
                href="#tratamientos"
                onClick={closeMenu}
                className="font-display text-3xl font-semibold text-white hover:text-secondary transition-colors"
              >
                Tratamientos
              </a>
              <a
                href="#equipo"
                onClick={closeMenu}
                className="font-display text-3xl font-semibold text-white hover:text-secondary transition-colors"
              >
                Equipo
              </a>
              <a
                href="#urgencias"
                onClick={closeMenu}
                className="font-display text-3xl font-semibold text-white hover:text-secondary transition-colors"
              >
                Urgencias
              </a>
              <a
                href="#contacto"
                onClick={closeMenu}
                className="font-display text-3xl font-semibold text-white hover:text-secondary transition-colors"
              >
                Contacto
              </a>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-4 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Av. La Dehesa 440, of. 316, Lo Barnechea</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Lun–Vie 9:00–19:00 · Sáb 9:00–14:00</span>
              </p>
              <a
                href="tel:+56966707209"
                className="flex items-center gap-2 text-white hover:text-secondary"
              >
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>+56 9 6670 7209</span>
              </a>
              <a
                href="https://reserva.dentalqub.cl/assensus"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-2 w-full bg-secondary text-ink font-semibold rounded-full min-h-[52px] flex items-center justify-center gap-2 text-base"
              >
                <CalendarDays className="w-5 h-5" />
                <span>Agendar hora online</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* 
          SECCIÓN 1 — HERO (id="inicio")
          bg-primary with subtle linear gradient to bg-primary-deep.
          Must show on 390x844px without scrolling:
          - Title
          - "Agendar hora" full width, cyan with visible text
          - "Escribir por WhatsApp"
          - "5,0 en Google · 103 opiniones"
          - "Urgencias a cualquier hora, previa coordinación"
        */}
        <section
          id="inicio"
          className="relative scroll-mt-24 bg-primary bg-gradient-to-b from-primary to-primary-deep min-h-[calc(100svh-66px)] md:min-h-[88vh] pt-24 md:pt-28 pb-10 md:pb-16 flex flex-col justify-between overflow-hidden"
        >
          {/* Background Cordillera Echo & Vertex SVG */}
          <div className="absolute right-0 top-16 md:top-1/2 md:-translate-y-1/2 pointer-events-none select-none z-0">
            {/* Cordillera Echo Triangle (shifted, opacity-10) */}
            <svg
              width="480"
              height="410"
              viewBox="0 0 100 86"
              fill="none"
              className="hidden md:block absolute -left-12 -top-8 opacity-10"
              aria-hidden="true"
            >
              <path
                d="M 6 82 L 50 6 L 94 82 Z"
                stroke="#00B4D8"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Main Hero Vertex SVG (Desktop 460px, Mobile 260px behind text opacity-20) */}
            <div className="opacity-20 md:opacity-100 translate-x-12 md:translate-x-0 -translate-y-4 md:translate-y-0">
              <svg
                viewBox="0 0 100 86"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[260px] md:w-[460px] h-auto"
                aria-hidden="true"
              >
                <path
                  d="M 6 82 L 50 6 L 94 82 Z"
                  stroke="#00B4D8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="anim-draw-outer"
                />
                <path
                  d="M 28 82 L 50 40 L 72 82 Z"
                  stroke="#00B4D8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="anim-draw-inner"
                />
              </svg>
            </div>
          </div>

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full flex-1 flex flex-col justify-center">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                <VertexGlyph size={12} strokeWidth={2} color="#00B4D8" />
                <span className="text-secondary font-display text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
                  CLÍNICA ODONTOLÓGICA · LA DEHESA
                </span>
              </div>

              {/* H1 with staggered word animation */}
              <h1 className="font-display font-semibold text-[2.6rem] md:text-7xl text-white leading-[1.05] tracking-tight mb-4 md:mb-6">
                {heroTitleWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="anim-word mr-[0.28em] last:mr-0"
                    style={{ animationDelay: `${0.3 + idx * 0.07}s` }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Subtitle / Bajada */}
              <p className="anim-fade-hero text-white/75 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl">
                Invisalign®, carillas de cerámica, ortodoncia e implantes en Lo
                Barnechea, con escáner 3D iTero y un especialista para cada
                tratamiento.
              </p>

              {/* Action Buttons: Stacked full width on mobile, inline on desktop */}
              <div className="anim-fade-hero flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <a
                  href="https://reserva.dentalqub.cl/assensus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-secondary text-ink font-semibold rounded-full min-h-[52px] px-8 flex items-center justify-center gap-2.5 shadow-md hover:bg-white transition-colors text-base"
                >
                  <CalendarDays className="w-5 h-5 text-ink" />
                  <span>Agendar hora</span>
                </a>

                <a
                  href="https://wa.me/56966707209?text=Hola%20Assensus%2C%20quisiera%20hacer%20una%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-white/30 text-white font-semibold rounded-full min-h-[52px] px-8 flex items-center justify-center gap-2.5 hover:border-white hover:bg-white/5 transition-colors text-base"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Escribir por WhatsApp</span>
                </a>
              </div>

              {/* Trust Pills */}
              <div className="anim-fade-hero flex flex-wrap items-center gap-2.5 md:gap-3">
                <div className="inline-flex items-center gap-2 border border-white/15 bg-primary-deep/50 rounded-full px-3.5 py-1.5 text-xs md:text-sm text-white/80">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span>5,0 en Google · 103 opiniones</span>
                </div>
                <div className="inline-flex items-center gap-2 border border-white/15 bg-primary-deep/50 rounded-full px-3.5 py-1.5 text-xs md:text-sm text-white/80">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>Urgencias a cualquier hora, previa coordinación</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info Strip */}
          <div className="relative z-10 w-full border-t border-white/10 mt-8 pt-6">
            <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6 text-xs md:text-sm text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Av. La Dehesa 440, of. 316</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Lun–Vie 9:00–19:00 · Sáb 9:00–14:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Estacionamiento en el edificio</span>
              </div>
            </div>
          </div>
        </section>

        {/* 
          SECCIÓN 2 — TRATAMIENTOS (id="tratamientos")
          Fondo bg-surface. Editorial list of rows.
        */}
        <section
          id="tratamientos"
          className="scroll-mt-20 py-20 md:py-28 bg-surface"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            {/* Header */}
            <div className="max-w-2xl mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <VertexGlyph size={12} strokeWidth={2} color="#2C67B9" />
                <span className="text-mid font-display text-xs font-semibold tracking-[0.25em] uppercase">
                  TRATAMIENTOS
                </span>
              </div>
              <h2 className="font-display font-semibold text-4xl md:text-5xl text-primary leading-[1.05] tracking-tight mb-4">
                Elige por dónde empezar.
              </h2>
              <p className="text-ink/80 text-base md:text-lg leading-relaxed">
                Cada tratamiento lo planifica el especialista de esa área, con
                escáner 3D y diagnóstico antes de intervenir.
              </p>
            </div>

            {/* Editorial List of Rows */}
            <div className="border-b border-primary/10">
              {/* Row 01: Invisalign® */}
              <div className="group border-t border-primary/10 py-7 md:py-9 transition-colors hover:bg-white rounded-xl px-3 md:px-6">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8">
                  <div className="flex items-start gap-4 md:gap-6 flex-1">
                    <div className="flex items-center gap-1.5 text-mid group-hover:text-primary transition-colors flex-shrink-0 pt-0.5">
                      <span className="font-display font-semibold text-2xl md:text-3xl">
                        01
                      </span>
                      <VertexGlyph
                        size={10}
                        strokeWidth={2}
                        color="currentColor"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-2xl md:text-3xl text-primary mb-2">
                        Invisalign®
                      </h3>
                      <p className="text-ink/80 text-base md:text-lg leading-relaxed mb-3">
                        Alineadores transparentes hechos a tu medida desde un
                        escaneo 3D. Te los sacas para comer y vienes a control
                        una vez al mes. Lo planifica el Dr. Felipe Figueroa,
                        doctor certificado Invisalign®.
                      </p>
                      <p className="text-xs md:text-sm text-ink/60 leading-normal max-w-2xl">
                        Alineadores de laboratorio: aprox. $800.000 a $1.700.000
                        según tu caso, más honorarios clínicos. El valor exacto
                        se define tras la planificación digital. Puedes pagar en
                        cuotas.
                      </p>
                    </div>
                  </div>
                  <div className="self-start md:self-center flex-shrink-0 pt-2 md:pt-0">
                    <a
                      href={`https://wa.me/56966707209?text=${encodeURIComponent(
                        'Hola Assensus, quiero agendar una evaluación de Invisalign®.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-mid font-semibold text-sm md:text-base hover:text-primary transition-colors"
                    >
                      <span>Consultar por WhatsApp</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Row 02: Diseño de sonrisa y carillas */}
              <div className="group border-t border-primary/10 py-7 md:py-9 transition-colors hover:bg-white rounded-xl px-3 md:px-6">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8">
                  <div className="flex items-start gap-4 md:gap-6 flex-1">
                    <div className="flex items-center gap-1.5 text-mid group-hover:text-primary transition-colors flex-shrink-0 pt-0.5">
                      <span className="font-display font-semibold text-2xl md:text-3xl">
                        02
                      </span>
                      <VertexGlyph
                        size={10}
                        strokeWidth={2}
                        color="currentColor"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-2xl md:text-3xl text-primary mb-2">
                        Diseño de sonrisa y carillas
                      </h3>
                      <p className="text-ink/80 text-base md:text-lg leading-relaxed">
                        Fotos, radiografías y diseño digital de tu sonrisa. Antes
                        de tocar un diente te instalamos un mockup de prueba
                        para que veas y apruebes el resultado. Carillas de
                        cerámica de alta estética.
                      </p>
                    </div>
                  </div>
                  <div className="self-start md:self-center flex-shrink-0 pt-2 md:pt-0">
                    <a
                      href={`https://wa.me/56966707209?text=${encodeURIComponent(
                        'Hola Assensus, quiero agendar una evaluación de Diseño de sonrisa y carillas.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-mid font-semibold text-sm md:text-base hover:text-primary transition-colors"
                    >
                      <span>Consultar por WhatsApp</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Row 03: Ortodoncia */}
              <div className="group border-t border-primary/10 py-7 md:py-9 transition-colors hover:bg-white rounded-xl px-3 md:px-6">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8">
                  <div className="flex items-start gap-4 md:gap-6 flex-1">
                    <div className="flex items-center gap-1.5 text-mid group-hover:text-primary transition-colors flex-shrink-0 pt-0.5">
                      <span className="font-display font-semibold text-2xl md:text-3xl">
                        03
                      </span>
                      <VertexGlyph
                        size={10}
                        strokeWidth={2}
                        color="currentColor"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-2xl md:text-3xl text-primary mb-2">
                        Ortodoncia
                      </h3>
                      <p className="text-ink/80 text-base md:text-lg leading-relaxed">
                        Brackets estéticos y convencionales para niños,
                        adolescentes y adultos. En el estudio de ortodoncia te
                        decimos si te conviene brackets o alineadores.
                      </p>
                    </div>
                  </div>
                  <div className="self-start md:self-center flex-shrink-0 pt-2 md:pt-0">
                    <a
                      href={`https://wa.me/56966707209?text=${encodeURIComponent(
                        'Hola Assensus, quiero agendar una evaluación de Ortodoncia.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-mid font-semibold text-sm md:text-base hover:text-primary transition-colors"
                    >
                      <span>Consultar por WhatsApp</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Row 04: Implantes dentales */}
              <div className="group border-t border-primary/10 py-7 md:py-9 transition-colors hover:bg-white rounded-xl px-3 md:px-6">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8">
                  <div className="flex items-start gap-4 md:gap-6 flex-1">
                    <div className="flex items-center gap-1.5 text-mid group-hover:text-primary transition-colors flex-shrink-0 pt-0.5">
                      <span className="font-display font-semibold text-2xl md:text-3xl">
                        04
                      </span>
                      <VertexGlyph
                        size={10}
                        strokeWidth={2}
                        color="currentColor"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-2xl md:text-3xl text-primary mb-2">
                        Implantes dentales
                      </h3>
                      <p className="text-ink/80 text-base md:text-lg leading-relaxed">
                        Implantes de titanio planificados en 3D y con cirugía
                        guiada, para reemplazar uno o varios dientes sin
                        desgastar los vecinos.
                      </p>
                    </div>
                  </div>
                  <div className="self-start md:self-center flex-shrink-0 pt-2 md:pt-0">
                    <a
                      href={`https://wa.me/56966707209?text=${encodeURIComponent(
                        'Hola Assensus, quiero agendar una evaluación de Implantes dentales.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-mid font-semibold text-sm md:text-base hover:text-primary transition-colors"
                    >
                      <span>Consultar por WhatsApp</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Row 05: Urgencia dental */}
              <div className="group border-t border-primary/10 py-7 md:py-9 transition-colors hover:bg-white rounded-xl px-3 md:px-6">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8">
                  <div className="flex items-start gap-4 md:gap-6 flex-1">
                    <div className="flex items-center gap-1.5 text-mid group-hover:text-primary transition-colors flex-shrink-0 pt-0.5">
                      <span className="font-display font-semibold text-2xl md:text-3xl">
                        05
                      </span>
                      <VertexGlyph
                        size={10}
                        strokeWidth={2}
                        color="currentColor"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-2xl md:text-3xl text-primary mb-2">
                        Urgencia dental
                      </h3>
                      <p className="text-ink/80 text-base md:text-lg leading-relaxed">
                        Dolor intenso, un diente roto, una infección o un golpe.
                        Te damos la hora disponible más cercana, a cualquier
                        hora, previa coordinación.
                      </p>
                    </div>
                  </div>
                  <div className="self-start md:self-center flex-shrink-0 pt-2 md:pt-0">
                    <a
                      href="#urgencias"
                      className="inline-flex items-center gap-1.5 text-mid font-semibold text-sm md:text-base hover:text-primary transition-colors"
                    >
                      <span>Ver cómo funciona →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Treatments Tags */}
            <div className="mt-12 pt-4 flex flex-wrap items-center gap-2.5">
              <span className="text-sm font-semibold text-ink/80 mr-1">
                También atendemos:
              </span>
              {[
                'Endodoncia',
                'Periodoncia',
                'Odontopediatría',
                'Blanqueamiento',
                'Limpieza y destartraje',
                'Prótesis fija',
                'Dolor orofacial y ATM',
              ].map((tag) => (
                <span
                  key={tag}
                  className="border border-primary/15 bg-white text-ink/70 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Closing CTA */}
            <div className="mt-12 text-left">
              <a
                href="https://reserva.dentalqub.cl/assensus"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white font-semibold rounded-full min-h-[52px] px-8 inline-flex items-center justify-center gap-2.5 hover:bg-mid transition-colors text-base shadow-sm"
              >
                <CalendarDays className="w-5 h-5 text-secondary" />
                <span>Agendar hora</span>
              </a>
            </div>
          </div>
        </section>

        {/* 
          SECCIÓN 3 — EQUIPO Y TECNOLOGÍA (id="equipo")
          Fondo bg-primary. 7/5 columns desktop, 1 column mobile.
        */}
        <section
          id="equipo"
          className="scroll-mt-20 py-20 md:py-28 bg-primary text-white"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            {/* Header */}
            <div className="max-w-2xl mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <VertexGlyph size={12} strokeWidth={2} color="#00B4D8" />
                <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase">
                  EQUIPO CLÍNICO
                </span>
              </div>
              <h2 className="font-display font-semibold text-4xl md:text-5xl text-white leading-[1.05] tracking-tight mb-4">
                Nueve especialistas, un mismo edificio.
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                No te derivamos a otro lado: el ortodoncista, el implantólogo, el
                endodoncista y la odontopediatra trabajan juntos en La Dehesa.
              </p>
            </div>

            {/* 7/5 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: 9 Specialists (7 of 12) */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                  {/* 1 */}
                  <div className="flex items-center gap-3.5">
                    <DoctorMonogram initials="RC" />
                    <div>
                      <h4 className="text-white font-medium text-base">
                        Dr. Ricardo Canales
                      </h4>
                      <p className="text-white/60 text-sm">
                        Director clínico y odontología general
                      </p>
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="flex items-center gap-3.5">
                    <DoctorMonogram initials="FF" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-white font-medium text-base">
                          Dr. Felipe Figueroa
                        </h4>
                        <span className="text-[10px] font-semibold text-secondary border border-secondary/40 rounded-full px-2 py-0.5 uppercase tracking-wider">
                          Certificado Invisalign®
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">
                        Ortodoncia y ortopedia
                      </p>
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="flex items-center gap-3.5">
                    <DoctorMonogram initials="FA" />
                    <div>
                      <h4 className="text-white font-medium text-base">
                        Dr. Felipe Abarzúa
                      </h4>
                      <p className="text-white/60 text-sm">
                        Implantología buco maxilofacial
                      </p>
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="flex items-center gap-3.5">
                    <DoctorMonogram initials="JA" />
                    <div>
                      <h4 className="text-white font-medium text-base">
                        Dr. Jack Altschiller
                      </h4>
                      <p className="text-white/60 text-sm">
                        Cirugía y traumatología buco maxilofacial
                      </p>
                    </div>
                  </div>

                  {/* 5 */}
                  <div className="flex items-center gap-3.5">
                    <DoctorMonogram initials="SS" />
                    <div>
                      <h4 className="text-white font-medium text-base">
                        Dra. Stephanie Stone
                      </h4>
                      <p className="text-white/60 text-sm">Endodoncia</p>
                    </div>
                  </div>

                  {/* 6 */}
                  <div className="flex items-center gap-3.5">
                    <DoctorMonogram initials="FP" />
                    <div>
                      <h4 className="text-white font-medium text-base">
                        Dr. Felipe Parga
                      </h4>
                      <p className="text-white/60 text-sm">Endodoncia</p>
                    </div>
                  </div>

                  {/* 7 */}
                  <div className="flex items-center gap-3.5">
                    <DoctorMonogram initials="MC" />
                    <div>
                      <h4 className="text-white font-medium text-base">
                        Dr. Matías Chávez
                      </h4>
                      <p className="text-white/60 text-sm">Periodoncia</p>
                    </div>
                  </div>

                  {/* 8 */}
                  <div className="flex items-center gap-3.5">
                    <DoctorMonogram initials="LP" />
                    <div>
                      <h4 className="text-white font-medium text-base">
                        Dra. Laura Pinochet
                      </h4>
                      <p className="text-white/60 text-sm">Odontopediatría</p>
                    </div>
                  </div>

                  {/* 9 */}
                  <div className="flex items-center gap-3.5 sm:col-span-2">
                    <DoctorMonogram initials="MS" />
                    <div>
                      <h4 className="text-white font-medium text-base">
                        Dra. Maite Salinas
                      </h4>
                      <p className="text-white/60 text-sm">
                        Trastornos temporomandibulares y dolor orofacial
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Technology Panel (5 of 12) */}
              <div className="lg:col-span-5 bg-primary-deep border border-white/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-semibold text-xl md:text-2xl text-white mb-6">
                    Tecnología en el mismo piso
                  </h3>

                  <div className="space-y-6">
                    {/* Item 1 */}
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-primary border border-white/10 text-secondary flex-shrink-0">
                        <ScanLine className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-base mb-1">
                          Escáner intraoral iTero Element 5D
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          Impresiones digitales, sin moldes incómodos.
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10" />

                    {/* Item 2 */}
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-primary border border-white/10 text-secondary flex-shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-base mb-1">
                          Planificación digital
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          ClinCheck para Invisalign® y guías 3D para implantes.
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10" />

                    {/* Item 3 */}
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-primary border border-white/10 text-secondary flex-shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-base mb-1">
                          Centro radiológico Scanlab, of. 306
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          Panorámicas y tomografía CBCT 3D en el mismo edificio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA inside section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href="https://reserva.dentalqub.cl/assensus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-secondary text-ink font-semibold rounded-full min-h-[52px] flex items-center justify-center gap-2 hover:bg-white transition-colors text-base"
                  >
                    <CalendarDays className="w-5 h-5" />
                    <span>Agendar evaluación</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          SECCIÓN 4 — URGENCIAS (id="urgencias")
          Fondo bg-white. High urgency conversion card.
        */}
        <section
          id="urgencias"
          className="scroll-mt-20 py-20 md:py-28 bg-white text-ink"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="bg-surface rounded-2xl border border-primary/10 border-t-4 md:border-t-0 md:border-l-4 md:border-l-secondary p-6 sm:p-10 md:p-12 shadow-sm">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3">
                <VertexGlyph size={12} strokeWidth={2} color="#2C67B9" />
                <span className="text-mid font-display text-xs font-semibold tracking-[0.25em] uppercase">
                  URGENCIA DENTAL
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-primary leading-[1.05] tracking-tight mb-4">
                ¿Dolor, un diente roto o una infección?
              </h2>
              <p className="text-ink/80 text-base md:text-lg leading-relaxed max-w-3xl mb-8 md:mb-10">
                Atendemos urgencias a cualquier hora, previa coordinación.
                Llámanos o escríbenos y te damos la hora disponible más cercana.
              </p>

              {/* 3 Step Process */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-5 rounded-xl border border-primary/10 flex flex-col">
                  <div className="flex items-center gap-2 text-mid mb-3">
                    <span className="font-display font-semibold text-xl">
                      1
                    </span>
                    <VertexGlyph size={12} strokeWidth={2} color="#2C67B9" />
                  </div>
                  <p className="text-ink font-medium text-base">
                    Nos contactas y coordinamos.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-primary/10 flex flex-col">
                  <div className="flex items-center gap-2 text-mid mb-3">
                    <span className="font-display font-semibold text-xl">
                      2
                    </span>
                    <VertexGlyph size={12} strokeWidth={2} color="#2C67B9" />
                  </div>
                  <p className="text-ink font-medium text-base">
                    Te evaluamos con examen clínico y radiografía.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-primary/10 flex flex-col">
                  <div className="flex items-center gap-2 text-mid mb-3">
                    <span className="font-display font-semibold text-xl">
                      3
                    </span>
                    <VertexGlyph size={12} strokeWidth={2} color="#2C67B9" />
                  </div>
                  <p className="text-ink font-medium text-base">
                    Tratamos la urgencia: alivio inmediato o tratamiento
                    definitivo si se puede en la misma sesión.
                  </p>
                </div>
              </div>

              {/* Emergency Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <a
                  href="tel:+56966707209"
                  className="w-full sm:w-auto bg-primary text-white font-semibold rounded-full min-h-[52px] px-8 flex items-center justify-center gap-2.5 hover:bg-mid transition-colors text-base shadow-sm"
                >
                  <Phone className="w-5 h-5 text-secondary" />
                  <span>Llamar ahora</span>
                </a>

                <a
                  href="https://wa.me/56966707209?text=Hola%2C%20tengo%20una%20urgencia%20dental."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-whatsapp text-white font-semibold rounded-full min-h-[52px] px-8 flex items-center justify-center gap-2.5 hover:opacity-95 transition-opacity text-base shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp de urgencia</span>
                </a>
              </div>

              {/* Notice Notes */}
              <div className="space-y-3 pt-6 border-t border-primary/10">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/70">
                  <Info className="w-4 h-4 text-mid flex-shrink-0 mt-0.5" />
                  <span>
                    Niños de 12 años o menos: la urgencia la atiende nuestra
                    odontopediatra, sujeto a su disponibilidad y con costo
                    adicional. Escríbenos antes de venir.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/70">
                  <Info className="w-4 h-4 text-mid flex-shrink-0 mt-0.5" />
                  <span>
                    Si se te cayó un diente por un golpe, tómalo por la corona y
                    tráelo en leche.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          SECCIÓN 5 — CONTACTO Y UBICACIÓN (id="contacto")
          Fondo bg-surface.
          Left: WhatsApp Form. Right: Information & How to get there.
        */}
        <section
          id="contacto"
          className="scroll-mt-20 py-20 md:py-28 bg-surface"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            {/* Header */}
            <div className="max-w-2xl mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <VertexGlyph size={12} strokeWidth={2} color="#2C67B9" />
                <span className="text-mid font-display text-xs font-semibold tracking-[0.25em] uppercase">
                  CONTACTO
                </span>
              </div>
              <h2 className="font-display font-semibold text-4xl md:text-5xl text-primary leading-[1.05] tracking-tight mb-4">
                Agenda tu evaluación.
              </h2>
              <p className="text-ink/80 text-base md:text-lg leading-relaxed">
                Escríbenos y te respondemos por WhatsApp, o agenda directo en
                línea.
              </p>
            </div>

            {/* 2 Column Grid: On mobile, form first */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Form Column (Lg 6 of 12) */}
              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-primary/10 shadow-sm">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="form-nombre"
                      className="block text-sm font-semibold text-ink mb-1.5"
                    >
                      Nombre <span className="text-mid">*</span>
                    </label>
                    <input
                      id="form-nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => {
                        setFormData({ ...formData, nombre: e.target.value });
                        if (formError) setFormError('');
                      }}
                      placeholder="Tu nombre y apellido"
                      className="w-full h-12 px-4 rounded-xl border border-primary/20 bg-white text-ink text-base focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                    />
                    {formError && (
                      <p className="mt-1 text-xs font-medium text-mid">
                        {formError}
                      </p>
                    )}
                  </div>

                  {/* Tratamiento de interés */}
                  <div>
                    <label
                      htmlFor="form-tratamiento"
                      className="block text-sm font-semibold text-ink mb-1.5"
                    >
                      Tratamiento de interés
                    </label>
                    <select
                      id="form-tratamiento"
                      value={formData.tratamiento}
                      onChange={(e) =>
                        setFormData({ ...formData, tratamiento: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl border border-primary/20 bg-white text-ink text-base focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                    >
                      <option value="Invisalign®">Invisalign®</option>
                      <option value="Diseño de sonrisa y carillas">
                        Diseño de sonrisa y carillas
                      </option>
                      <option value="Ortodoncia">Ortodoncia</option>
                      <option value="Implantes dentales">
                        Implantes dentales
                      </option>
                      <option value="Urgencia dental">Urgencia dental</option>
                      <option value="Otro tratamiento">Otro tratamiento</option>
                    </select>
                  </div>

                  {/* ¿Es una urgencia? */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">
                      ¿Es una urgencia?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Sí', 'No'].map((opcion) => (
                        <button
                          key={opcion}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, urgencia: opcion })
                          }
                          className={`h-11 rounded-xl text-sm font-medium transition-all ${
                            formData.urgencia === opcion
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-surface border border-primary/15 text-ink hover:bg-white'
                          }`}
                        >
                          {opcion}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Horario preferido */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">
                      Horario preferido
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Mañana', 'Tarde', 'Sábado'].map((horario) => (
                        <button
                          key={horario}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, horario })
                          }
                          className={`h-11 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                            formData.horario === horario
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-surface border border-primary/15 text-ink hover:bg-white'
                          }`}
                        >
                          {horario}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mensaje opcional */}
                  <div>
                    <label
                      htmlFor="form-mensaje"
                      className="block text-sm font-semibold text-ink mb-1.5"
                    >
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="form-mensaje"
                      rows={3}
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      placeholder="Cuéntanos más sobre lo que buscas o tus síntomas..."
                      className="w-full p-3.5 rounded-xl border border-primary/20 bg-white text-ink text-base focus:outline-none focus:ring-2 focus:ring-secondary transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full min-h-[48px] bg-whatsapp text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity text-base shadow-sm"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Enviar por WhatsApp</span>
                    </button>
                    <p className="mt-2 text-xs text-ink/60 text-center">
                      Se abrirá WhatsApp con tu mensaje listo para enviar.
                    </p>
                  </div>
                </form>
              </div>

              {/* Details & Location Column (Lg 6 of 12) */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-primary/10 text-mid flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-primary">
                        Dirección
                      </h4>
                      <p className="text-ink/80 text-sm leading-relaxed">
                        Av. La Dehesa 440, of. 316, Lo Barnechea, Santiago.
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-primary/10 text-mid flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-primary">
                        Horarios
                      </h4>
                      <p className="text-ink/80 text-sm leading-relaxed">
                        Lunes a viernes 9:00–19:00 · Sábado 9:00–14:00.
                      </p>
                      <p className="text-xs text-mid mt-0.5 font-medium">
                        Urgencias a cualquier hora, previa coordinación.
                      </p>
                    </div>
                  </div>

                  {/* Parking */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-primary/10 text-mid flex-shrink-0">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-primary">
                        Estacionamiento
                      </h4>
                      <p className="text-ink/80 text-sm leading-relaxed">
                        En el mismo edificio, pisos -2 al -6, con tarifa por
                        tiempo.
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-primary/10 text-mid flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-primary">
                        Teléfono y WhatsApp
                      </h4>
                      <a
                        href="tel:+56966707209"
                        className="text-mid hover:text-primary text-sm font-semibold transition-colors"
                      >
                        +56 9 6670 7209
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-primary/10 text-mid flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-primary">
                        Correo electrónico
                      </h4>
                      <a
                        href="mailto:clinica@assensus.cl"
                        className="text-mid hover:text-primary text-sm font-semibold transition-colors"
                      >
                        clinica@assensus.cl
                      </a>
                    </div>
                  </div>

                  {/* Payments & Insurance */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-primary/10 text-mid flex-shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-primary">
                        Medios de pago y reembolsos
                      </h4>
                      <p className="text-ink/80 text-sm leading-relaxed">
                        Efectivo, débito, crédito y transferencia. Boleta y bono
                        para tu seguro complementario.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map & Booking Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="https://reserva.dentalqub.cl/assensus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white font-semibold rounded-full min-h-[52px] px-7 inline-flex items-center justify-center gap-2 hover:bg-mid transition-colors text-base shadow-sm"
                  >
                    <CalendarDays className="w-5 h-5 text-secondary" />
                    <span>Agendar hora online</span>
                  </a>

                  <a
                    href="https://www.google.com/maps/place/?q=place_id:ChIJXQOpT7_LYpYRjD9bfmpxGU8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-primary/20 text-primary font-semibold rounded-full min-h-[52px] px-7 inline-flex items-center justify-center gap-2 hover:bg-white transition-colors text-base"
                  >
                    <MapPin className="w-5 h-5 text-mid" />
                    <span>Cómo llegar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 
        FOOTER
        Fondo bg-primary. Logo (120px wide), data, social links, terms.
        Bottom strip in bg-primary-deep.
        Extra padding-bottom on mobile (pb-24) to avoid floating WhatsApp clash.
      */}
      <footer className="bg-primary text-white border-t border-white/10 pb-24 md:pb-0">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
            {/* Logo */}
            <div>
              <LogoBrand imgClassName="w-[120px] h-auto object-contain" />
              <p className="text-white/60 text-xs mt-3 max-w-sm leading-relaxed">
                Sociedad Odontológica Assensus SpA · Especialidades odontológicas
                y estética dental en La Dehesa, Lo Barnechea.
              </p>
            </div>

            {/* Contact quick links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 text-sm text-white/80">
              <a
                href="tel:+56966707209"
                className="hover:text-secondary transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-secondary" />
                <span>+56 9 6670 7209</span>
              </a>
              <a
                href="mailto:clinica@assensus.cl"
                className="hover:text-secondary transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-secondary" />
                <span>clinica@assensus.cl</span>
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/assensus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors p-1"
                  aria-label="Instagram de Assensus Clínica Dental"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/AssensusClinicaOdontologica/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors p-1"
                  aria-label="Facebook de Assensus Clínica Dental"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
            <p>
              Av. La Dehesa 440, of. 316, Lo Barnechea, Santiago, Chile.
            </p>
            <a
              href="https://assensus.cl/terminos-y-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-secondary transition-colors underline"
            >
              Términos y privacidad
            </a>
          </div>
        </div>

        {/* Deep primary footer bottom bar */}
        <div className="bg-primary-deep py-4 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-5 md:px-8 text-center md:text-left">
            <p className="text-white/60 text-xs">
              © 2026 Assensus Clínica Dental. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* 
        FLOATING WHATSAPP BUTTON
        Always visible, 56px circle, bg-whatsapp, white MessageCircle icon.
        Safe area inset for iPhone.
      */}
      <aside aria-label="Contacto rápido WhatsApp">
        <a
          href="https://wa.me/56966707209?text=Hola%20Assensus%2C%20quisiera%20hacer%20una%20consulta."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-50 right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
          aria-label="Escribir por WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </aside>
    </div>
  );
}
