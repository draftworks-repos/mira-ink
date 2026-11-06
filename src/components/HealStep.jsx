import React from 'react';
import { Droplets, Sparkles, Sun, ShieldCheck } from 'lucide-react';
import './HealStep.css';

const ICON_MAP = {
  ShieldCheck,
  Droplets,
  Sparkles,
  Sun
};

export default function HealStep({
  step,
  index = 0
}) {
  const IconComponent = ICON_MAP[step.iconName] || ShieldCheck;

  return (
    <div className="heal-step" style={{ '--step-delay': `${index * 120}ms` }}>
      <div className="heal-step__marker-wrap">
        <div className="heal-step__marker">
          <span className="heal-step__dot" />
        </div>
      </div>

      <div className="heal-step__card">
        <div className="heal-step__top">
          <span className="heal-step__time display-type">{step.timeframe}</span>
          <div className="heal-step__icon-box">
            <IconComponent size={20} className="heal-step__icon" />
          </div>
        </div>

        <span className="label-type heal-step__subhead">{step.subhead}</span>

        <div className="heal-step__lines">
          {step.lines.map((line, idx) => (
            <p key={idx} className="heal-step__line">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
