import { Settings } from "lucide-react";
import { AccountContent } from "./_components/account-content";

export default function SettingsAccount() {
  return (
    <div className="container mx-auto space-y-4 pt-5">

      <div className="max-w-4xl py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Settings className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-medium">Configurações de conta</h2>
            <p className="text-gray-600">Gerencie suas preferências do app de sonhos</p>
          </div>
        </div>
      </div>
      <AccountContent />
    </div>
  )
}