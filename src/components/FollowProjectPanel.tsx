import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Check,
  Bell,
  MessageCircle,
  Mail,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Eye,
  Send,
  Linkedin,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useBuyerJourney } from '../context/BuyerJourneyContext';
import {
  FollowNotificationChannel,
  FollowNotificationTopics,
  ProjectSubscription,
} from '../types';
import { TVICLLogo } from './TVICLLogo';

export const FollowProjectPanel: React.FC = () => {
  const {
    projectToFollow,
    setProjectToFollow,
    saveProjectSubscription,
    getProjectSubscription,
    unsubscribeProject,
  } = useBuyerJourney();

  if (!projectToFollow) return null;

  const proj = projectToFollow;
  const existingSub = getProjectSubscription(proj.id);

  // Form State
  const [channel, setChannel] = useState<FollowNotificationChannel>(
    existingSub?.channel || 'whatsapp'
  );
  const [inApp, setInApp] = useState(
    existingSub ? existingSub.inApp : true
  );

  // Contact fields
  const [whatsAppNumber, setWhatsAppNumber] = useState(
    existingSub?.contactValue && !existingSub.contactValue.startsWith('@') && !existingSub.contactValue.includes('@')
      ? existingSub.contactValue
      : '+234 803 000 0000'
  );
  const [emailAddress, setEmailAddress] = useState(
    existingSub?.emailValue || ''
  );
  const [socialHandle, setSocialHandle] = useState(
    existingSub?.socialHandle || '@buyer_handle'
  );

  // Interactive Live Preview tab
  const [previewTab, setPreviewTab] = useState<'whatsapp' | 'instagram' | 'messenger' | 'email'>('whatsapp');
  const [showLivePreviewModal, setShowLivePreviewModal] = useState(false);

  // Topics
  const [topics, setTopics] = useState<FollowNotificationTopics>(
    existingSub?.topics || {
      construction: true,
      photosVideos: true,
      pricing: true,
      availability: true,
      inspections: true,
    }
  );

  const [isSuccess, setIsSuccess] = useState(false);

  const handleToggleTopic = (key: keyof FollowNotificationTopics) => {
    setTopics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAllTopics = () => {
    setTopics({
      construction: true,
      photosVideos: true,
      pricing: true,
      availability: true,
      inspections: true,
    });
  };

  const getContactValue = () => {
    switch (channel) {
      case 'whatsapp':
        return whatsAppNumber;
      case 'instagram':
      case 'messenger':
      case 'linkedin':
      case 'telegram':
        return socialHandle;
      case 'email':
        return emailAddress;
      case 'both':
        return whatsAppNumber;
      default:
        return whatsAppNumber;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subscription: ProjectSubscription = {
      projectId: proj.id,
      projectName: proj.name,
      followedAt: 'Today',
      channel,
      inApp,
      contactValue: getContactValue(),
      emailValue: emailAddress,
      socialHandle: socialHandle,
      topics,
      status: 'ACTIVE',
    };

    saveProjectSubscription(proj, subscription);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setProjectToFollow(null);
    }, 1900);
  };

  const handleUnsubscribe = () => {
    unsubscribeProject(proj.id);
    setProjectToFollow(null);
  };

  // Pre-formatted 1-click deep links for buyers who prefer direct messaging
  const instagramDeepLink = `https://ig.me/m/tvicl_luxury?text=${encodeURIComponent(
    `Hello TVICL, I'd like to follow ${proj.name} construction milestones and private drone releases.`
  )}`;
  const messengerDeepLink = `https://m.me/tvicl?ref=${encodeURIComponent(
    `follow_${proj.id}`
  )}`;
  const whatsAppDeepLink = `https://wa.me/2348030000000?text=${encodeURIComponent(
    `Hello TVICL, please send updates for ${proj.name} to this WhatsApp.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setProjectToFollow(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-[#14120e] border border-[#383226] rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#28241d] bg-[#110f0c] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1d1a13] border border-[#3b3528] flex items-center justify-center text-[#e5c07b] flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37]">
                  OMNICHANNEL NOTIFICATION HUB
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f5f3ef]">
                Follow {proj.name}
              </h3>
              <p className="text-xs text-[#a39b8c] mt-0.5">
                Receive site milestones, drone footage, and structural approvals on your preferred app.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLivePreviewModal(!showLivePreviewModal)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-[#3a3429] bg-[#1c1913] text-[#e5c07b] hover:border-[#d4af37] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Preview how updates look on social media"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview Alert</span>
            </button>
            <button
              onClick={() => setProjectToFollow(null)}
              className="w-8 h-8 rounded-lg bg-[#1a1813] border border-[#332e24] flex items-center justify-center text-[#9c9484] hover:text-[#f5f3ef] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Channel Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0]">
                    Where should we send your updates?
                  </label>
                  <span className="text-[10px] text-[#736c5d]">No passwords or app logins required</span>
                </div>

                {/* Omnichannel Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  
                  {/* WhatsApp (Primary) */}
                  <label
                    onClick={() => {
                      setChannel('whatsapp');
                      setPreviewTab('whatsapp');
                    }}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      channel === 'whatsapp'
                        ? 'border-[#e5c07b] bg-[#1f1b13] text-[#f5f3ef] shadow-sm'
                        : 'border-[#2d281f] bg-[#171510] text-[#a69e8e] hover:border-[#4d4434]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center border-[#d4af37] flex-shrink-0">
                        {channel === 'whatsapp' && (
                          <div className="w-2 h-2 rounded-full bg-[#e5c07b]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs sm:text-sm font-medium">WhatsApp</span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-semibold">
                            Recommended
                          </span>
                        </div>
                        <p className="text-[11px] text-[#787163] mt-0.5">High-res photos & site video clips</p>
                      </div>
                    </div>
                  </label>

                  {/* Instagram Direct */}
                  <label
                    onClick={() => {
                      setChannel('instagram');
                      setPreviewTab('instagram');
                    }}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      channel === 'instagram'
                        ? 'border-[#e5c07b] bg-[#1f1b13] text-[#f5f3ef] shadow-sm'
                        : 'border-[#2d281f] bg-[#171510] text-[#a69e8e] hover:border-[#4d4434]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center border-[#d4af37] flex-shrink-0">
                        {channel === 'instagram' && (
                          <div className="w-2 h-2 rounded-full bg-[#e5c07b]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          {/* Instagram Gradient Icon */}
                          <div className="w-3.5 h-3.5 rounded bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold">
                            IG
                          </div>
                          <span className="text-xs sm:text-sm font-medium">Instagram Direct</span>
                        </div>
                        <p className="text-[11px] text-[#787163] mt-0.5">Official TVICL verified DMs & reels</p>
                      </div>
                    </div>
                  </label>

                  {/* Facebook Messenger */}
                  <label
                    onClick={() => {
                      setChannel('messenger');
                      setPreviewTab('messenger');
                    }}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      channel === 'messenger'
                        ? 'border-[#e5c07b] bg-[#1f1b13] text-[#f5f3ef] shadow-sm'
                        : 'border-[#2d281f] bg-[#171510] text-[#a69e8e] hover:border-[#4d4434]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center border-[#d4af37] flex-shrink-0">
                        {channel === 'messenger' && (
                          <div className="w-2 h-2 rounded-full bg-[#e5c07b]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">
                            ⚡
                          </div>
                          <span className="text-xs sm:text-sm font-medium">Messenger</span>
                        </div>
                        <p className="text-[11px] text-[#787163] mt-0.5">Interactive card updates & plan PDFs</p>
                      </div>
                    </div>
                  </label>

                  {/* Email Dossier */}
                  <label
                    onClick={() => {
                      setChannel('email');
                      setPreviewTab('email');
                    }}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      channel === 'email'
                        ? 'border-[#e5c07b] bg-[#1f1b13] text-[#f5f3ef] shadow-sm'
                        : 'border-[#2d281f] bg-[#171510] text-[#a69e8e] hover:border-[#4d4434]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center border-[#d4af37] flex-shrink-0">
                        {channel === 'email' && (
                          <div className="w-2 h-2 rounded-full bg-[#e5c07b]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-xs sm:text-sm font-medium">Email Dossier</span>
                        </div>
                        <p className="text-[11px] text-[#787163] mt-0.5">Architectural reports & cost breakdown</p>
                      </div>
                    </div>
                  </label>

                  {/* LinkedIn / Corporate Briefing */}
                  <label
                    onClick={() => {
                      setChannel('linkedin');
                    }}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      channel === 'linkedin'
                        ? 'border-[#e5c07b] bg-[#1f1b13] text-[#f5f3ef] shadow-sm'
                        : 'border-[#2d281f] bg-[#171510] text-[#a69e8e] hover:border-[#4d4434]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center border-[#d4af37] flex-shrink-0">
                        {channel === 'linkedin' && (
                          <div className="w-2 h-2 rounded-full bg-[#e5c07b]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-xs sm:text-sm font-medium">LinkedIn InMail</span>
                        </div>
                        <p className="text-[11px] text-[#787163] mt-0.5">Diaspora & corporate investment updates</p>
                      </div>
                    </div>
                  </label>

                  {/* Multi-Channel (WhatsApp + Email) */}
                  <label
                    onClick={() => {
                      setChannel('both');
                    }}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      channel === 'both'
                        ? 'border-[#e5c07b] bg-[#1f1b13] text-[#f5f3ef] shadow-sm'
                        : 'border-[#2d281f] bg-[#171510] text-[#a69e8e] hover:border-[#4d4434]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center border-[#d4af37] flex-shrink-0">
                        {channel === 'both' && (
                          <div className="w-2 h-2 rounded-full bg-[#e5c07b]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#e5c07b]" />
                          <span className="text-xs sm:text-sm font-medium">WhatsApp + Email</span>
                        </div>
                        <p className="text-[11px] text-[#787163] mt-0.5">Comprehensive omnichannel delivery</p>
                      </div>
                    </div>
                  </label>

                </div>

                {/* Input Fields based on Selected Channel */}
                <div className="mt-3 space-y-2.5 p-3 rounded-xl bg-[#191611] border border-[#2d281f]">
                  {channel === 'whatsapp' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-[#a69e8e] font-medium">
                          Your WhatsApp Phone Number
                        </span>
                        <a
                          href={whatsAppDeepLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <span>Or 1-Tap Message Us</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <input
                        type="tel"
                        required
                        value={whatsAppNumber}
                        onChange={(e) => setWhatsAppNumber(e.target.value)}
                        placeholder="+234 803 123 4567"
                        className="w-full px-3 py-2 rounded-lg bg-[#14120e] border border-[#383226] text-xs sm:text-sm text-[#f5f3ef] placeholder-[#665f52] focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>
                  )}

                  {(channel === 'instagram' || channel === 'messenger' || channel === 'linkedin' || channel === 'telegram') && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-[#a69e8e] font-medium">
                          Your {channel === 'instagram' ? 'Instagram @Handle' : channel === 'messenger' ? 'Facebook / Messenger Handle' : channel === 'linkedin' ? 'LinkedIn Profile or Handle' : 'Telegram Handle'}
                        </span>
                        {channel === 'instagram' && (
                          <a
                            href={instagramDeepLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-rose-400 hover:underline flex items-center gap-1"
                          >
                            <span>1-Click DM via @tvicl_luxury</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {channel === 'messenger' && (
                          <a
                            href={messengerDeepLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-sky-400 hover:underline flex items-center gap-1"
                          >
                            <span>Open m.me/tvicl</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={socialHandle}
                          onChange={(e) => setSocialHandle(e.target.value)}
                          placeholder={
                            channel === 'instagram'
                              ? '@your_instagram_handle'
                              : channel === 'messenger'
                              ? 'm.me/yourname or username'
                              : 'linkedin.com/in/yourname'
                          }
                          className="w-full px-3 py-2 rounded-lg bg-[#14120e] border border-[#383226] text-xs sm:text-sm text-[#f5f3ef] placeholder-[#665f52] focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-[#736c5d] mt-1">
                        Zero login required. TVICL's verified business handle sends updates straight to your inbox without sharing your password.
                      </p>
                    </div>
                  )}

                  {channel === 'email' && (
                    <div>
                      <span className="text-[11px] text-[#a69e8e] font-medium block mb-1">
                        Your Private Email Address
                      </span>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="investor@domain.com"
                        className="w-full px-3 py-2 rounded-lg bg-[#14120e] border border-[#383226] text-xs sm:text-sm text-[#f5f3ef] placeholder-[#665f52] focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>
                  )}

                  {channel === 'both' && (
                    <div className="space-y-2">
                      <div>
                        <span className="text-[11px] text-[#a69e8e] font-medium block mb-1">
                          WhatsApp Number
                        </span>
                        <input
                          type="tel"
                          required
                          value={whatsAppNumber}
                          onChange={(e) => setWhatsAppNumber(e.target.value)}
                          placeholder="+234 803 123 4567"
                          className="w-full px-3 py-2 rounded-lg bg-[#14120e] border border-[#383226] text-xs sm:text-sm text-[#f5f3ef] placeholder-[#665f52] focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-[#a69e8e] font-medium block mb-1">
                          Email Address
                        </span>
                        <input
                          type="email"
                          required
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          placeholder="investor@domain.com"
                          className="w-full px-3 py-2 rounded-lg bg-[#14120e] border border-[#383226] text-xs sm:text-sm text-[#f5f3ef] placeholder-[#665f52] focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* In-App Checkbox */}
                <div className="mt-3">
                  <label
                    onClick={() => setInApp(!inApp)}
                    className="flex items-center gap-2.5 cursor-pointer text-xs text-[#cfc7b6] select-none"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        inApp
                          ? 'bg-[#c59b27] border-[#e5c07b] text-[#131210]'
                          : 'border-[#383226] bg-[#1a1813]'
                      }`}
                    >
                      {inApp && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>Sync with My TVICL Concept Board & live ticker</span>
                  </label>
                </div>
              </div>

              {/* Topics Selection */}
              <div className="pt-2 border-t border-[#262118]">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a0]">
                    What updates should we push?
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAllTopics}
                    className="text-[11px] text-[#d4af37] hover:underline"
                  >
                    Select all
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Topic 1: Construction Progress */}
                  <label
                    onClick={() => handleToggleTopic('construction')}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      topics.construction
                        ? 'border-[#c59b27]/60 bg-[#1c1811] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#16140f] text-[#8e8574]'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        topics.construction
                          ? 'bg-[#c59b27] border-[#e5c07b] text-[#131210]'
                          : 'border-[#3b3427]'
                      }`}
                    >
                      {topics.construction && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>Construction progress milestones</span>
                  </label>

                  {/* Topic 2: Photos & Videos */}
                  <label
                    onClick={() => handleToggleTopic('photosVideos')}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      topics.photosVideos
                        ? 'border-[#c59b27]/60 bg-[#1c1811] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#16140f] text-[#8e8574]'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        topics.photosVideos
                          ? 'bg-[#c59b27] border-[#e5c07b] text-[#131210]'
                          : 'border-[#3b3427]'
                      }`}
                    >
                      {topics.photosVideos && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>Drone clips & site photography</span>
                  </label>

                  {/* Topic 3: Pricing & Payment Plans */}
                  <label
                    onClick={() => handleToggleTopic('pricing')}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      topics.pricing
                        ? 'border-[#c59b27]/60 bg-[#1c1811] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#16140f] text-[#8e8574]'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        topics.pricing
                          ? 'bg-[#c59b27] border-[#e5c07b] text-[#131210]'
                          : 'border-[#3b3427]'
                      }`}
                    >
                      {topics.pricing && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>Phase price releases & payment terms</span>
                  </label>

                  {/* Topic 4: Availability */}
                  <label
                    onClick={() => handleToggleTopic('availability')}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      topics.availability
                        ? 'border-[#c59b27]/60 bg-[#1c1811] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#16140f] text-[#8e8574]'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        topics.availability
                          ? 'bg-[#c59b27] border-[#e5c07b] text-[#131210]'
                          : 'border-[#3b3427]'
                      }`}
                    >
                      {topics.availability && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>Unit releases & allocation alerts</span>
                  </label>

                  {/* Topic 5: Quality Inspections */}
                  <label
                    onClick={() => handleToggleTopic('inspections')}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all sm:col-span-2 ${
                      topics.inspections
                        ? 'border-[#c59b27]/60 bg-[#1c1811] text-[#f5f3ef]'
                        : 'border-[#2d281f] bg-[#16140f] text-[#8e8574]'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        topics.inspections
                          ? 'bg-[#c59b27] border-[#e5c07b] text-[#131210]'
                          : 'border-[#3b3427]'
                      }`}
                    >
                      {topics.inspections && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>COREN engineering certifications & soil lab tests</span>
                  </label>
                </div>
              </div>

              {/* Social Channels Preview Expander */}
              <div className="rounded-xl border border-[#2e2920] bg-[#16140f] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowLivePreviewModal(!showLivePreviewModal)}
                  className="w-full p-3 flex items-center justify-between text-left text-xs text-[#cfc7b6] hover:text-[#f5f3ef] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#e5c07b]" />
                    <span className="font-medium">
                      See how your update arrives on {channel.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#d4af37]">
                    {showLivePreviewModal ? 'Hide Mockup' : 'View Sample Alert'}
                  </span>
                </button>

                <AnimatePresence>
                  {showLivePreviewModal && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 pt-1 border-t border-[#262118]"
                    >
                      {/* Sub-channel preview tabs */}
                      <div className="flex items-center gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => setPreviewTab('whatsapp')}
                          className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                            previewTab === 'whatsapp'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                              : 'text-[#8c8474] hover:text-[#cfc7b6]'
                          }`}
                        >
                          WhatsApp Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('instagram')}
                          className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                            previewTab === 'instagram'
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                              : 'text-[#8c8474] hover:text-[#cfc7b6]'
                          }`}
                        >
                          Instagram DM Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('messenger')}
                          className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                            previewTab === 'messenger'
                              ? 'bg-blue-950/80 text-blue-300 border border-blue-500/40'
                              : 'text-[#8c8474] hover:text-[#cfc7b6]'
                          }`}
                        >
                          Messenger Preview
                        </button>
                      </div>

                      {/* Mockup Container */}
                      {previewTab === 'instagram' ? (
                        /* Instagram Mockup */
                        <div className="bg-[#121212] border border-[#2b2b2b] rounded-xl p-3 text-xs max-w-sm mx-auto shadow-xl">
                          <div className="flex items-center justify-between pb-2 border-b border-[#2b2b2b]">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#1b1710] border border-[#d4af37]/60 flex items-center justify-center p-0.5 shadow-sm">
                                <TVICLLogo variant="mark-only" size="sm" />
                              </div>
                              <span className="font-semibold text-white">tvicl_luxury</span>
                              <span className="text-[10px] px-1 py-0.2 bg-blue-600/30 text-blue-400 rounded">
                                Verified
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-500">Just now</span>
                          </div>

                          <div className="mt-2.5 bg-[#202020] rounded-lg overflow-hidden border border-[#333]">
                            <img
                              src={proj.image}
                              alt="Site update"
                              className="w-full h-28 object-cover"
                            />
                            <div className="p-2.5 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-[#f5f3ef] text-[11px]">
                                  {proj.name} — Milestone Update
                                </span>
                                <span className="text-[10px] text-emerald-400 font-mono">
                                  {proj.stage}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-300">{proj.headline}</p>
                            </div>
                          </div>

                          <div className="mt-2 flex gap-2">
                            <button
                              type="button"
                              className="flex-1 py-1.5 bg-[#2d2d2d] hover:bg-[#383838] text-white text-[10px] font-semibold rounded-md text-center"
                            >
                              Request Site Tour
                            </button>
                            <button
                              type="button"
                              className="flex-1 py-1.5 bg-[#2d2d2d] hover:bg-[#383838] text-white text-[10px] font-semibold rounded-md text-center"
                            >
                              Download Plan PDF
                            </button>
                          </div>
                        </div>
                      ) : previewTab === 'messenger' ? (
                        /* Messenger Mockup */
                        <div className="bg-[#18191a] border border-[#3a3b3c] rounded-xl p-3 text-xs max-w-sm mx-auto shadow-xl">
                          <div className="flex items-center gap-2 pb-2 border-b border-[#3a3b3c]">
                            <div className="w-6 h-6 rounded-full bg-[#1b1710] border border-[#d4af37]/60 flex items-center justify-center p-0.5 shadow-sm">
                              <TVICLLogo variant="mark-only" size="sm" />
                            </div>
                            <div>
                              <p className="font-semibold text-white text-[11px]">TVICL Luxury Estates</p>
                              <p className="text-[9px] text-gray-400">Official Messenger Bot</p>
                            </div>
                          </div>

                          <div className="mt-2.5 p-2.5 bg-[#242526] rounded-lg border border-[#3a3b3c] space-y-1.5">
                            <span className="text-[10px] font-semibold text-[#e5c07b] uppercase tracking-wide">
                              Live Site Dispatch
                            </span>
                            <p className="text-white text-[11px] font-medium">{proj.name}</p>
                            <p className="text-gray-300 text-[10px]">{proj.headline}</p>
                            <div className="pt-2 flex flex-col gap-1.5">
                              <div className="p-1.5 rounded bg-[#3a3b3c] text-white text-[10px] text-center font-medium">
                                📍 Stage: {proj.stage} ({proj.progressPercent || 72}% complete)
                              </div>
                              <div className="p-1.5 rounded bg-blue-600 text-white text-[10px] text-center font-medium">
                                💬 Reply to chat with lead architect
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* WhatsApp Mockup */
                        <div className="bg-[#0b141a] border border-[#1f2c34] rounded-xl p-3 text-xs max-w-sm mx-auto shadow-xl">
                          <div className="flex items-center gap-2 pb-2 border-b border-[#1f2c34]">
                            <div className="w-6 h-6 rounded-full bg-[#1b1710] border border-[#d4af37]/60 flex items-center justify-center p-0.5 shadow-sm">
                              <TVICLLogo variant="mark-only" size="sm" />
                            </div>
                            <div>
                              <p className="font-semibold text-white text-[11px]">TVICL Construction Hub</p>
                              <p className="text-[9px] text-emerald-400">Official Business Account</p>
                            </div>
                          </div>

                          <div className="mt-2.5 p-2.5 bg-[#1f2c34] rounded-lg rounded-tl-none border border-[#2a3942] space-y-1.5 text-white">
                            <p className="text-[11px] font-semibold text-emerald-300">
                              🏗️ {proj.name} — Stage Verified
                            </p>
                            <p className="text-[10px] text-gray-200">
                              {proj.headline}
                            </p>
                            <p className="text-[9px] text-gray-400">
                              Lead Architect: {proj.architect} · Engineer: {proj.siteEngineer}
                            </p>
                            <div className="mt-2 pt-2 border-t border-[#2a3942] flex justify-between text-[10px] text-emerald-400 font-medium">
                              <span>[1] Request Video</span>
                              <span>[2] Speak to Architect</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#262118] flex items-center justify-between gap-3">
                {existingSub && (
                  <button
                    type="button"
                    onClick={handleUnsubscribe}
                    className="text-xs text-[#8c8474] hover:text-rose-400 transition-colors"
                  >
                    Unfollow project
                  </button>
                )}

                <button
                  type="submit"
                  className="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c59b27] text-[#131210] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition-all shadow-md shadow-[#c59b27]/25 cursor-pointer"
                >
                  <span>{existingSub ? 'Update Channels' : 'Confirm & Follow Project'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Zero-friction explanation */}
              <p className="text-[11px] text-[#736c5d] text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Zero login or API keys needed. Dispatches originate from TVICL's official verified business handles.</span>
              </p>
            </form>
          ) : (
            /* Success confirmation */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <div>
                <h4 className="text-xl font-serif font-bold text-[#f5f3ef]">
                  Subscription Activated!
                </h4>
                <p className="text-xs sm:text-sm text-[#b8b09f] mt-1 max-w-sm mx-auto">
                  You are now following <span className="text-[#f5f3ef] font-semibold">{proj.name}</span> via{' '}
                  <span className="text-[#e5c07b] font-medium capitalize">
                    {channel === 'both' ? 'WhatsApp & Email' : channel}
                  </span>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#191712] border border-[#2e2920] text-xs text-[#a69e8e] max-w-sm mx-auto space-y-1">
                <div className="flex items-center justify-between text-[#e5c07b]">
                  <span className="font-semibold">Next Scheduled Dispatch</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2e2920]">Ready</span>
                </div>
                <p className="text-[#f5f3ef] font-medium">
                  {proj.headline}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
