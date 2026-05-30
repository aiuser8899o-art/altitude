import { useEffect, useState } from 'react';
import Head from 'next/head';

interface TimeZone {
  name: string;
  timezone: string;
  offset: string;
}

const TIME_ZONES: TimeZone[] = [
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', offset: 'PST/PDT' },
  { name: 'New York', timezone: 'America/New_York', offset: 'EST/EDT' },
  { name: 'London', timezone: 'Europe/London', offset: 'GMT/BST' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', offset: 'JST' },
  { name: 'Sydney', timezone: 'Australia/Sydney', offset: 'AEDT/AEST' },
  { name: 'Dubai', timezone: 'Asia/Dubai', offset: 'GST' },
  { name: 'Singapore', timezone: 'Asia/Singapore', offset: 'SGT' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', offset: 'HKT' },
];

interface ClockState {
  [key: string]: {
    time: string;
    date: string;
  };
}

export default function DigitalClock() {
  const [clocks, setClocks] = useState<ClockState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClocks = () => {
      const newClocks: ClockState = {};

      TIME_ZONES.forEach((tz) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.timezone,
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        newClocks[tz.timezone] = {
          time: formatter.format(new Date()),
          date: dateFormatter.format(new Date()),
        };
      });

      setClocks(newClocks);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Head>
        <title>Global Digital Clock | ALTITUDE</title>
        <meta name="description" content="Real-time digital clock displaying multiple time zones" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-black tracking-widest text-white hover:text-gray-300 transition-colors">
          ALTITUDE
        </a>
        <div className="flex space-x-4">
          <a href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Global Clock
            </h1>
            <p className="text-gray-400 text-lg tracking-wide">
              Real-time display across major time zones
            </p>
          </div>

          {/* Clock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {TIME_ZONES.map((tz) => (
              <div
                key={tz.timezone}
                className="group relative bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/5 group-hover:to-cyan-500/10 transition-all duration-300" />

                <div className="relative z-10">
                  {/* City Name */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-1">
                      {tz.name}
                    </h2>
                    <p className="text-xs font-mono text-gray-500 tracking-widest">
                      {tz.offset}
                    </p>
                  </div>

                  {/* Digital Time Display */}
                  <div className="mb-4">
                    <div className="font-mono text-5xl font-black text-cyan-400 tracking-wider break-words">
                      {clocks[tz.timezone]?.time || '--:--:--'}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-400 font-mono tracking-wide">
                    {clocks[tz.timezone]?.date || 'Loading...'}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Additional Clock Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {/* UTC Clock */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8">
              <h3 className="text-sm uppercase font-bold tracking-widest text-gray-400 mb-4">
                Coordinated Universal Time
              </h3>
              <div className="font-mono text-4xl font-black text-green-400 tracking-wider mb-2">
                {new Date().toISOString().split('T')[1].split('.')[0]}
              </div>
              <p className="text-xs text-gray-500 font-mono">
                {new Date().toISOString().split('T')[0]}
              </p>
            </div>

            {/* Local System Time */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8">
              <h3 className="text-sm uppercase font-bold tracking-widest text-gray-400 mb-4">
                Your Local Time
              </h3>
              <div className="font-mono text-4xl font-black text-purple-400 tracking-wider mb-2">
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })}
              </div>
              <p className="text-xs text-gray-500 font-mono">
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-neutral-900/50 border border-white/5 rounded-2xl p-8 text-center">
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
              This global clock updates every second, displaying real-time information across 8 major time zones worldwide. 
              Perfect for coordinating meetings and events across different regions.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-xs tracking-widest text-gray-500 uppercase">
        <p>&copy; {new Date().getFullYear()} ALTITUDE Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
