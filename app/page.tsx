'use client'

import { motion } from "framer-motion";
import Image from "next/image";

export default function UnderConstruction() {

  return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 text-center">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
        >
          <div className="mb-10">
            <div className="text-4xl font-bold tracking-widest">
                <Image src="/logo.png" alt="Hebent Tech"
                width={250} height={100} />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold mb-6">We Are Building Something Great</h1>
          <p className="text-lg opacity-80 mb-10">
            Our new digital experience is on its way. Stay tuned.
          </p>

          <motion.div
              className="w-32 h-1 bg-white/20 rounded-full overflow-hidden mx-auto"
          >
            <motion.div
                className="h-full bg-white"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        <div className="fixed bottom-6 text-sm opacity-70">
          © {new Date().getFullYear()} Hebent Tech. All rights reserved.
        </div>
      </div>
  );
}