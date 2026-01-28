'use client';

import { Bell, Shield, User } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-foreground text-2xl font-bold sm:text-3xl">
          Settings
        </h1>
        <p className="text-secondary mt-1 text-sm sm:text-base">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="border-border rounded-lg border bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-3 sm:mb-6">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h2 className="text-foreground text-lg font-semibold sm:text-xl">
              Profile Settings
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none sm:px-4 sm:py-2.5 sm:text-base"
              />
            </div>
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none sm:px-4 sm:py-2.5 sm:text-base"
              />
            </div>
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                Bio
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself"
                className="border-border focus:ring-primary w-full resize-none rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none sm:px-4 sm:py-2.5 sm:text-base"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row">
            <button className="bg-primary hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors sm:px-6 sm:py-2.5 sm:text-base">
              Save Changes
            </button>
            <button className="border-border text-secondary hover:bg-muted rounded-lg border px-4 py-2 text-sm font-medium transition-colors sm:px-6 sm:py-2.5 sm:text-base">
              Cancel
            </button>
          </div>
        </div>

        <div className="border-border rounded-lg border bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-3 sm:mb-6">
            <div className="bg-secondary/10 text-secondary rounded-lg p-2">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h2 className="text-foreground text-lg font-semibold sm:text-xl">
              Notifications
            </h2>
          </div>
          <div className="space-y-4">
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div>
                <p className="text-foreground text-sm font-medium sm:text-base">
                  Email Notifications
                </p>
                <p className="text-secondary text-xs sm:text-sm">
                  Receive email updates about your blogs
                </p>
              </div>
              <input
                type="checkbox"
                className="text-primary h-5 w-5 shrink-0 rounded"
                defaultChecked
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div>
                <p className="text-foreground text-sm font-medium sm:text-base">
                  Push Notifications
                </p>
                <p className="text-secondary text-xs sm:text-sm">
                  Get push notifications on your device
                </p>
              </div>
              <input
                type="checkbox"
                className="text-primary h-5 w-5 shrink-0 rounded"
              />
            </label>
          </div>
        </div>

        <div className="border-border rounded-lg border bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-3 sm:mb-6">
            <div className="bg-error/10 text-error rounded-lg p-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h2 className="text-foreground text-lg font-semibold sm:text-xl">
              Security
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none sm:px-4 sm:py-2.5 sm:text-base"
              />
            </div>
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none sm:px-4 sm:py-2.5 sm:text-base"
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-6">
            <button className="bg-primary hover:bg-primary-hover w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors sm:w-auto sm:px-6 sm:py-2.5 sm:text-base">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
