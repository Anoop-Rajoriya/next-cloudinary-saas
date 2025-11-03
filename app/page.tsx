"use client";

import Link from "next/link";
import {
  CloudUpload,
  Image,
  Video,
  Sparkles,
  Download,
  ArrowRight,
  Eye,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base-100">
      {/* HERO */}
      <section className="px-6 py-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Transform your media with
            <span className="text-primary"> Next Cloudy</span>
          </h1>

          <p className="text-lg opacity-80 max-w-lg">
            Upload images and videos using Cloudinary. Auto-generate
            transformations, preview videos on hover, and download everything in
            one smooth workflow.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              Get Started
              <ArrowRight className="ml-1" size={18} />
            </Link>

            <Link href="/video-upload" className="btn btn-outline btn-lg">
              Try Video Preview
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="mockup-window border bg-base-200 shadow-xl">
            <div className="p-4 text-center">
              <Image size={80} className="mx-auto opacity-60" />
              <p className="mt-4 text-sm opacity-70">
                Demo preview — real transformations happen in the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-base-200 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What you can do with Next Cloudy
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* IMAGE UPLOAD */}
            <FeatureCard
              icon={<Image size={32} />}
              title="Upload Images"
              desc="Upload and store your images using Cloudinary with full optimization control."
            />

            {/* TRANSFORMATIONS */}
            <FeatureCard
              icon={<Sparkles size={32} />}
              title="Auto Transformations"
              desc="Generate multiple variants instantly — resize, crop, enhance, and more."
            />

            {/* DOWNLOAD */}
            <FeatureCard
              icon={<Download size={32} />}
              title="Download Ready"
              desc="Download transformed results without touching a single config file."
            />

            {/* VIDEO UPLOAD */}
            <FeatureCard
              icon={<Video size={32} />}
              title="Upload Videos"
              desc="Upload full-quality videos directly and host through Cloudinary."
            />

            {/* HOVER PREVIEW */}
            <FeatureCard
              icon={<Eye size={32} />}
              title="Hover-To-Preview"
              desc="Hover your mouse to instantly preview videos — no loading screens."
            />

            {/* CLOUD UPLOAD */}
            <FeatureCard
              icon={<CloudUpload size={32} />}
              title="Fast Cloud Delivery"
              desc="Everything is CDN-accelerated through Cloudinary for maximum speed."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to transform your media?
        </h2>
        <p className="opacity-80 mb-8">
          No setup headaches. Straight to uploading, transforming, and
          downloading.
        </p>

        <Link href="/dashboard" className="btn btn-primary btn-lg">
          Open Dashboard
          <ArrowRight className="ml-1" size={18} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-base-200 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="opacity-70">© {new Date().getFullYear()} Next Cloudy</p>
          <div className="flex gap-4">
            <Link href="/" className="link link-hover">
              Home
            </Link>
            <Link href="/dashboard" className="link link-hover">
              Dashboard
            </Link>
            <Link href="/video-upload" className="link link-hover">
              Video Preview
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all">
      <div className="card-body">
        <div className="mb-3 text-primary">{icon}</div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="opacity-70">{desc}</p>
      </div>
    </div>
  );
}
