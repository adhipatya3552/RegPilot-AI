"use client";

import { useState } from "react";
import axios from "axios";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  Cpu, 
  FileText, 
  Database, 
  Zap, 
  Lock, 
  Terminal as TermIcon, 
  Compass, 
  ArrowRight,
  RefreshCw,
  HelpCircle,
  ExternalLink
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Gap {
  regulation: string;
  issue: string;
  severity: "high" | "medium" | "low";
}

interface ActionStep {
  regulation: string;
  action: string;
  timeline: string;
}

interface ComplianceReport {
  overall_risk: "high" | "medium" | "low";
  gaps: Gap[];
  compliant_areas: string[];
}

interface ActionPlan {
  action_steps: ActionStep[];
  disclaimer: string;
}

interface ResultData {
  compliance_report: ComplianceReport;
  action_plan: ActionPlan;
}

export default function Home() {
  const [idea, setIdea] = useState("");
  const [region, setRegion] = useState("global");
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"dashboard" | "gaps" | "compliant" | "roadmap">("dashboard");
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);
  
  // Scopes configuration for realistic compliance dials
  const [scopes, setScopes] = useState({
    generativeAi: true,
    userPrivacy: true,
    fintech: false,
    healthcare: false,
  });

  const regions = [
    { id: "global", label: "Global", icon: "🌍", desc: "Cross-border tech standards" },
    { id: "eu", label: "European Union", icon: "🇪🇺", desc: "GDPR, EU AI Act, DGA" },
    { id: "us", label: "United States", icon: "🇺🇸", desc: "FTC, HIPAA, CCPA, SEC" },
    { id: "india", label: "India", icon: "🇮🇳", desc: "DPDP Act, CERT-In guidelines" }
  ];

  const frameworks = [
    { name: "GDPR / ePrivacy", sector: "Privacy", desc: "European strict user privacy directives.", color: "text-blue-400 border-blue-500/20" },
    { name: "EU AI Act", sector: "AI Safety", desc: "Tiered risk assessment for artificial intelligence.", color: "text-purple-400 border-purple-500/20" },
    { name: "SOC 2 / ISO 27001", sector: "InfoSec", desc: "Enterprise data hosting and security standards.", color: "text-emerald-400 border-emerald-500/20" },
    { name: "HIPAA / CCPA", sector: "Consumer Rights", desc: "US healthcare and consumer data regulations.", color: "text-cyan-400 border-cyan-500/20" }
  ];

  const runScan = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setResult(null);
    setScanProgress(0);
    setLoadingSteps([]);

    const steps = [
      "📡 Handshaking with federal vector databases...",
      "📂 Loading active regulations for region [" + region.toUpperCase() + "]...",
      "🧠 Extracting concept embeddings and building semantic matches...",
      "⚖️ Scanning legal boundaries & classifying policy gaps...",
      "🛡️ Synthesizing compliance report and actionable roadmap..."
    ];

    // Trigger API call in parallel
    let apiResponse: ResultData | null = null;
    let apiError = false;

    const apiCall = axios.post(`${API}/analyze`, { idea, region })
      .then(res => {
        apiResponse = res.data;
      })
      .catch(err => {
        console.error("API Error: ", err);
        apiError = true;
      });

    // Run terminal simulation steps
    for (let i = 0; i < steps.length; i++) {
      setLoadingSteps(prev => [...prev, steps[i]]);
      setScanProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 550));
    }

    await apiCall;

    if (apiResponse) {
      setResult(apiResponse);
      setActiveTab("dashboard");
    } else {
      alert("Compliance node unreachable. Please check if the FastAPI backend is running.");
    }
    setLoading(false);
  };

  const getRadarPolygonPoints = () => {
    if (loading) {
      return "111,111 111,111 111,111 111,111";
    }
    if (!result) {
      return "111,60 161,111 111,161 61,111"; // Default standard shape
    }
    const risk = result.compliance_report.overall_risk;
    if (risk === "high") {
      // Small constricted shape
      return "111,90 131,111 111,131 91,111";
    }
    if (risk === "medium") {
      // Intermediate shape
      return "111,70 151,111 111,151 71,111";
    }
    // Low risk - wide compliance shape
    return "111,40 181,111 111,181 41,111";
  };

  const severityStyles = (s: string) => {
    if (s === "high") return { text: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/5", badge: "bg-red-500/20 text-red-300" };
    if (s === "medium") return { text: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/5", badge: "bg-yellow-500/20 text-yellow-300" };
    return { text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", badge: "bg-emerald-500/20 text-emerald-300" };
  };

  const timelineStyle = (t: string) => {
    if (t.toLowerCase() === "immediate") return "bg-red-500/20 text-red-400 border border-red-500/30";
    if (t.toLowerCase().includes("30 days")) return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 cyber-grid relative pb-16">
      {/* Background radial ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Navigation Header */}
      <nav className="border-b border-slate-800 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/30 shadow-inner">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <span className="font-mono font-bold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                RegPilot AI
              </span>
              <span className="text-[9px] font-mono text-slate-500 ml-2 border border-slate-800 px-1 rounded bg-slate-950 uppercase tracking-widest">
                v1.2
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">COMPLIANCE NODES SECURED</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Workspace Frame */}
      <div className="max-w-7xl mx-auto px-6 mt-8 md:mt-12 animate-fade-in-up">
        {/* Pitch Hero */}
        <header className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 mb-4">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-mono text-blue-300 tracking-wider uppercase">AI REGULATORY RADAR COCKPIT</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
            Audit Your Concept <br className="hidden md:inline" />
            Against <span className="underline decoration-blue-500/50">Global Tech Frameworks</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl">
            RegPilot parses your startup idea, maps data dependencies, and cross-references them with regional privacy laws, AI mandates, and cloud cybersecurity policies.
          </p>
        </header>

        {/* Workspace Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Configuration Console */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel glass-panel-glow rounded-2xl p-6 relative overflow-hidden">
              {/* Cockpit framing line */}
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500/30" />
              
              <h2 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                <TermIcon className="w-4 h-4 text-blue-400" />
                [CONSOLE_INPUT]
              </h2>

              {/* Startup Textarea */}
              <div className="space-y-2 mb-5">
                <label className="block text-xs font-mono uppercase text-slate-400">Describe your product & data flow</label>
                <div className="relative">
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your tech stack, user data flows, AI involvement, and monetization. E.g., 'An AI healthcare app that monitors wearable fitness biosignals, stores them in AWS, and uses LLMs to compile reports for insurance adjusters.'"
                    className="w-full h-44 bg-slate-950/80 text-slate-200 text-sm p-4 rounded-xl border border-slate-800/80 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600 resize-none font-sans leading-relaxed"
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500">
                    {idea.length} chars
                  </div>
                </div>
              </div>

              {/* Scope Toggles (Aesthetic Tech Checkboxes) */}
              <div className="mb-5 space-y-3">
                <span className="block text-xs font-mono uppercase text-slate-400 mb-2">Audit Vector Scopes</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button 
                    onClick={() => setScopes(s => ({ ...s, generativeAi: !s.generativeAi }))}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${scopes.generativeAi ? 'bg-purple-950/20 border-purple-500/30 text-purple-200' : 'bg-slate-950/40 border-slate-900 text-slate-500'}`}
                  >
                    <Cpu className={`w-3.5 h-3.5 ${scopes.generativeAi ? 'text-purple-400' : ''}`} />
                    <span>GenAI & LLMs</span>
                  </button>
                  <button 
                    onClick={() => setScopes(s => ({ ...s, userPrivacy: !s.userPrivacy }))}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${scopes.userPrivacy ? 'bg-blue-950/20 border-blue-500/30 text-blue-200' : 'bg-slate-950/40 border-slate-900 text-slate-500'}`}
                  >
                    <Lock className={`w-3.5 h-3.5 ${scopes.userPrivacy ? 'text-blue-400' : ''}`} />
                    <span>User Privacy</span>
                  </button>
                  <button 
                    onClick={() => setScopes(s => ({ ...s, fintech: !s.fintech }))}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${scopes.fintech ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' : 'bg-slate-950/40 border-slate-900 text-slate-500'}`}
                  >
                    <Database className={`w-3.5 h-3.5 ${scopes.fintech ? 'text-emerald-400' : ''}`} />
                    <span>Fintech Rules</span>
                  </button>
                  <button 
                    onClick={() => setScopes(s => ({ ...s, healthcare: !s.healthcare }))}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${scopes.healthcare ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-200' : 'bg-slate-950/40 border-slate-900 text-slate-500'}`}
                  >
                    <Shield className={`w-3.5 h-3.5 ${scopes.healthcare ? 'text-cyan-400' : ''}`} />
                    <span>Health Systems</span>
                  </button>
                </div>
              </div>

              {/* Target Region Custom selector */}
              <div className="space-y-2 mb-6">
                <label className="block text-xs font-mono uppercase text-slate-400">Regional Jurisdiction</label>
                <div className="grid grid-cols-2 gap-2">
                  {regions.map((reg) => (
                    <button
                      key={reg.id}
                      onClick={() => setRegion(reg.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        region === reg.id
                          ? "bg-blue-600/10 border-blue-500/60 text-white font-semibold"
                          : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <span>{reg.icon}</span>
                        <span>{reg.label}</span>
                      </div>
                      <p className="text-[10px] font-mono text-slate-500 leading-tight">{reg.desc}</p>
                      {region === reg.id && (
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-glow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Execute Compliance Run */}
              <button
                onClick={runScan}
                disabled={loading || !idea.trim()}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 border border-blue-500/30 disabled:border-slate-800 font-mono font-bold text-sm tracking-widest text-white shadow-lg transition-all duration-300 hover:shadow-blue-500/15 cursor-pointer relative overflow-hidden flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>SCANNING SYSTEMS...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-yellow-300 group-hover:scale-125 transition-transform" />
                    <span>RUN AUDIT REPORT</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel: Audit Monitor (Interactive States) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* IDLE STATE */}
            {!loading && !result && (
              <div className="glass-panel rounded-2xl p-8 text-center relative overflow-hidden h-full min-h-[500px] flex flex-col items-center justify-center">
                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-600 tracking-widest">
                  [SYSTEM_STATE: IDLE_MONITOR]
                </div>
                
                {/* Visual SVG Radar Shield */}
                <div className="relative w-64 h-64 mx-auto mb-8 animate-glow-pulse flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 220 220">
                    {/* Radial Guides */}
                    <circle cx="111" cy="111" r="100" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1" />
                    <circle cx="111" cy="111" r="70" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="1" />
                    <circle cx="111" cy="111" r="40" fill="none" stroke="rgba(56,189,248,0.12)" strokeWidth="1" />
                    
                    {/* Crosshair lines */}
                    <line x1="11" y1="111" x2="211" y2="111" stroke="rgba(56,189,248,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="111" y1="11" x2="111" y2="211" stroke="rgba(56,189,248,0.06)" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Quadrant labels */}
                    <text x="115" y="25" fill="rgba(192, 132, 252, 0.4)" fontSize="7" fontFamily="monospace" letterSpacing="1">AI SAFETY</text>
                    <text x="155" y="115" fill="rgba(56, 189, 248, 0.4)" fontSize="7" fontFamily="monospace" letterSpacing="1">PRIVACY</text>
                    <text x="115" y="200" fill="rgba(16, 185, 129, 0.4)" fontSize="7" fontFamily="monospace" letterSpacing="1">INFOSEC</text>
                    <text x="15" y="115" fill="rgba(6, 182, 212, 0.4)" fontSize="7" fontFamily="monospace" letterSpacing="1">CONSUMER</text>

                    {/* Pulsing Static Area Chart */}
                    <polygon 
                      points={getRadarPolygonPoints()}
                      fill="url(#radar-glow)" 
                      stroke="rgba(56, 189, 248, 0.3)" 
                      strokeWidth="1.5"
                      className="transition-all duration-1000"
                    />

                    {/* Scanner line */}
                    <g 
                      className="animate-radar-sweep origin-[111px_111px]" 
                      style={{ transformOrigin: "111px 111px" }}
                    >
                      <line x1="111" y1="111" x2="111" y2="11" stroke="url(#radar-sweep-grad)" strokeWidth="1.5" />
                      <path d="M111,111 L111,11 A100,100 0 0,1 181,41 Z" fill="url(#radar-sweep-area)" opacity="0.1" />
                    </g>

                    <defs>
                      <linearGradient id="radar-sweep-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                      </linearGradient>
                      <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
                      </radialGradient>
                      <linearGradient id="radar-sweep-area" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">Awaiting Product Analysis</h3>
                <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
                  Provide your startup details in the console inputs and trigger the audit vector scanner.
                </p>

                {/* Sub-framework Grid */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                  {frameworks.map((f, i) => (
                    <div 
                      key={i}
                      onMouseEnter={() => setHoveredFramework(f.name)}
                      onMouseLeave={() => setHoveredFramework(null)}
                      className={`p-3 rounded-lg border bg-slate-950/40 transition-all ${f.color} ${
                        hoveredFramework === f.name ? "ring-1 ring-blue-500/20 scale-105" : ""
                      }`}
                    >
                      <div className="text-[10px] font-mono text-slate-500 mb-1">{f.sector}</div>
                      <div className="text-xs font-bold text-slate-200 leading-tight mb-1">{f.name}</div>
                      <p className="text-[9px] text-slate-500 leading-normal">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCANNING / LOADING STATE */}
            {loading && (
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden min-h-[500px] flex flex-col justify-between">
                {/* Neon green scanner bar */}
                <div className="absolute left-0 right-0 h-0.5 bg-blue-400/40 animate-scanning-beam pointer-events-none" />
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="font-mono text-xs text-blue-300 font-bold uppercase tracking-wider">SYSTEM DIAGNOSTICS ACTIVE</span>
                  </div>
                  <div className="font-mono text-xs text-slate-400">{scanProgress}% COMPLETE</div>
                </div>

                {/* Simulated Radar Widget Speeding Up */}
                <div className="w-40 h-40 mx-auto my-6 relative flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 220 220">
                    <circle cx="111" cy="111" r="100" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1" />
                    <circle cx="111" cy="111" r="60" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
                    <g 
                      className="origin-[111px_111px] animate-[radar-sweep_1.5s_linear_infinite]"
                      style={{ transformOrigin: "111px 111px" }}
                    >
                      <line x1="111" y1="111" x2="111" y2="11" stroke="#38bdf8" strokeWidth="2" />
                    </g>
                  </svg>
                </div>

                {/* Simulated Diagnostic Logs */}
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-slate-400 min-h-[160px] flex flex-col justify-end space-y-1">
                  {loadingSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-blue-300/90 animate-fade-in-up">
                      <span className="text-slate-600">{`[0${idx + 1}]`}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                  {loadingSteps.length < 5 && (
                    <div className="flex gap-1 items-center text-slate-600 animate-pulse mt-1">
                      <span>_</span>
                    </div>
                  )}
                </div>

                {/* Progress bar line */}
                <div className="w-full h-1 bg-slate-950 rounded-full mt-4 overflow-hidden border border-slate-900">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* RESULTS REPORT DASHBOARD STATE */}
            {!loading && result && (
              <div className="space-y-6">
                
                {/* Result Section Header / Tabs */}
                <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <FileText className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm leading-tight">AUDIT REPORT DEFINITIONS</h3>
                      <p className="text-[10px] font-mono text-slate-500">JURISDICTION: {region.toUpperCase()}</p>
                    </div>
                  </div>

                  {/* Navigation tabs */}
                  <div className="flex gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-900 text-[10px] font-mono w-full sm:w-auto overflow-x-auto">
                    {[
                      { id: "dashboard", label: "KPI" },
                      { id: "gaps", label: `Gaps (${result.compliance_report.gaps?.length || 0})` },
                      { id: "compliant", label: "Compliant" },
                      { id: "roadmap", label: "Roadmap" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded-md transition-all font-semibold whitespace-nowrap cursor-pointer ${
                          activeTab === tab.id
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab: Dashboard Summary KPIs */}
                {activeTab === "dashboard" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Overall Risk Card */}
                    <div className={`glass-panel rounded-2xl p-6 border relative overflow-hidden flex flex-col justify-between min-h-[180px] ${
                      severityStyles(result.compliance_report.overall_risk).border
                    }`}>
                      <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-600">
                        [SEVERITY_METER]
                      </div>
                      
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-950 border border-slate-900 mb-2">
                          <AlertTriangle className={`w-3.5 h-3.5 ${severityStyles(result.compliance_report.overall_risk).text}`} />
                          <span>System Risk Index</span>
                        </div>
                        <h4 className="text-3xl font-black uppercase text-white tracking-tight leading-none mt-1">
                          {result.compliance_report.overall_risk} Risk
                        </h4>
                      </div>

                      <div className="mt-4">
                        <div className="w-full h-1.5 bg-slate-950 rounded-full border border-slate-900 overflow-hidden mb-2">
                          <div 
                            className={`h-full rounded-full ${
                              result.compliance_report.overall_risk === "high" ? "bg-red-500" 
                              : result.compliance_report.overall_risk === "medium" ? "bg-yellow-500" 
                              : "bg-emerald-500"
                            }`}
                            style={{ width: result.compliance_report.overall_risk === "high" ? "85%" : result.compliance_report.overall_risk === "medium" ? "50%" : "20%" }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Risk calculations derived from regulatory scope, data compliance rules, and alignment ratios.
                        </p>
                      </div>
                    </div>

                    {/* Small Radar Status chart */}
                    <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 flex flex-col items-center justify-center relative min-h-[180px]">
                      <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-600">
                        [COMPLIANCE_RADAR]
                      </div>
                      <div className="w-28 h-28 relative">
                        <svg className="w-full h-full" viewBox="0 0 220 220">
                          <circle cx="111" cy="111" r="100" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="2" />
                          <circle cx="111" cy="111" r="60" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1" />
                          <line x1="11" y1="111" x2="211" y2="111" stroke="rgba(56,189,248,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="111" y1="11" x2="111" y2="211" stroke="rgba(56,189,248,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                          <polygon 
                            points={getRadarPolygonPoints()}
                            fill="url(#radar-glow)" 
                            stroke="rgba(56, 189, 248, 0.4)" 
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-2 uppercase">Diagnostic footprint map</span>
                    </div>

                    {/* Highlights Summary Grid */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                      <div className="glass-panel rounded-xl p-4 text-center">
                        <div className="text-2xl font-black text-white">{result.compliance_report.gaps?.length || 0}</div>
                        <div className="text-[9px] font-mono uppercase text-slate-500 mt-1">Identified Violations</div>
                      </div>
                      <div className="glass-panel rounded-xl p-4 text-center">
                        <div className="text-2xl font-black text-white">{result.compliance_report.compliant_areas?.length || 0}</div>
                        <div className="text-[9px] font-mono uppercase text-slate-500 mt-1">Compliant Anchors</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Gaps List */}
                {activeTab === "gaps" && (
                  <div className="space-y-3">
                    {(!result.compliance_report.gaps || result.compliance_report.gaps.length === 0) ? (
                      <div className="glass-panel rounded-2xl p-6 text-center text-slate-400">
                        No compliance gaps identified. Concept appears clean.
                      </div>
                    ) : (
                      result.compliance_report.gaps.map((gap, i) => {
                        const style = severityStyles(gap.severity);
                        return (
                          <div 
                            key={i} 
                            className={`glass-panel rounded-xl p-5 border relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-slate-700/80 ${style.border} ${style.bg}`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <span className="font-mono font-bold text-sm text-slate-200">{gap.regulation}</span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider ${style.badge}`}>
                                {gap.severity} risk
                              </span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">{gap.issue}</p>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Tab: Compliant Areas */}
                {activeTab === "compliant" && (
                  <div className="glass-panel rounded-2xl p-6 space-y-4">
                    <h4 className="text-xs font-mono uppercase text-slate-400">Validated Conformity Factors</h4>
                    
                    {(!result.compliance_report.compliant_areas || result.compliance_report.compliant_areas.length === 0) ? (
                      <p className="text-sm text-slate-500 text-center py-6">No compliant anchors identified yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.compliance_report.compliant_areas.map((area, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-300 leading-normal font-sans font-medium">{area}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Action Roadmap Plan Accordion */}
                {activeTab === "roadmap" && (
                  <div className="space-y-4">
                    <div className="glass-panel rounded-xl p-4 flex items-center gap-3 bg-blue-950/5 border border-blue-950/20">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <div className="text-xs leading-normal">
                        <span className="font-bold text-blue-300">Phase Timeline Actions:</span> Recommended prioritization to satisfy requirements before launch.
                      </div>
                    </div>

                    <div className="space-y-2">
                      {(!result.action_plan.action_steps || result.action_plan.action_steps.length === 0) ? (
                        <div className="glass-panel rounded-2xl p-6 text-center text-slate-500">
                          No action roadmap required.
                        </div>
                      ) : (
                        result.action_plan.action_steps.map((step, i) => (
                          <div 
                            key={i} 
                            className={`glass-panel rounded-xl border transition-all duration-300 overflow-hidden ${
                              expandedStep === i ? "border-slate-700/80 bg-slate-950/40" : "border-slate-900/60"
                            }`}
                          >
                            <button
                              onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                              className="w-full p-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="text-xs font-mono text-slate-400">[STEP 0{i + 1}]</span>
                                <span className="font-sans font-bold text-slate-200 text-sm">{step.regulation}</span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider ${timelineStyle(step.timeline)}`}>
                                  {step.timeline}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                                  expandedStep === i ? "transform rotate-180" : ""
                                }`} />
                              </div>
                            </button>
                            
                            {expandedStep === i && (
                              <div className="px-4 pb-4 pt-1 text-slate-400 text-xs leading-relaxed border-t border-slate-900/60 animate-fade-in-up">
                                <p className="mb-2 font-sans">{step.action}</p>
                                <div className="mt-3 pt-3 border-t border-slate-900/40 flex justify-between items-center text-[10px] font-mono">
                                  <span className="text-slate-600">Audit Scope ID: REG-PLAN-{i + 10}</span>
                                  <a href="#" className="text-blue-400 hover:underline flex items-center gap-1">
                                    Browse reference guidelines <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    {/* Action Plan Disclaimer */}
                    {result.action_plan.disclaimer && (
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-amber-400/90 leading-normal font-mono">
                          ⚠️ LEGAL DISCLAIMER: {result.action_plan.disclaimer}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}