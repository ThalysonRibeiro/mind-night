"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Bell, Clock, Globe, Languages, Loader2, Save, Shield, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useFormUpdateUser } from "./use-update-user-form";
import { ReactNode, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/utils/fomatPhone";
import { Button } from "@/components/ui/button";
import { UpdateUserInput } from "@/lib/validators/schema-user";
import { useUpdateUser } from "../hooks/useUpdateUser";
import toast from 'react-hot-toast';
import { AvatarProfile } from "./avatar-profile";

export function AccountContent() {
  const { data: session, update } = useSession();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useFormUpdateUser();
  const mutation = useUpdateUser();

  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name || '',
        phone: session.user.phone || '',
      });
    }
  }, [session?.user, form]);


  const handleSubmit = async (formData: UpdateUserInput) => {

    try {
      setIsSubmitting(true);
      await mutation.mutate(formData);
      await update();
      toast.success('Atualizado com sucesso!');
    } catch (err) {
      console.log(err);

      toast.error('Erro ao atualizar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [userSettings, setUserSettings] = useState({
    // Notificações
    pushNotifications: true,
    emailNotifications: true,
    dreamReminders: true,
    reminderTime: '08:00',

    // Privacidade
    shareStatistics: false,
    publicProfile: false,

    // App
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo'
  });

  const [userStats] = useState({
    totalDreams: 47,
    streakDays: 12,
    longestStreak: 28,
    lastDreamDate: '2025-01-15',
    commonMoods: { "tranquilo": 15, "ansioso": 8, "feliz": 12, "confuso": 6 },
    commonTags: { "voar": 8, "água": 5, "família": 7, "trabalho": 4 }
  });

  const handleSettingChange = (setting: string, value: boolean | string) => {
    setUserSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    console.log('Salvando configurações...', {
      userSettings
    });

    toast('Configurações salvas com sucesso!');
  };

  const languageOptions = [
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'en-US', label: 'English (US)' },
    { value: 'es-ES', label: 'Español' },
    { value: 'fr-FR', label: 'Français' }
  ];

  const timezoneOptions = [
    { value: 'America/Sao_Paulo', label: 'São Paulo (UTC-3)' },
    { value: 'America/New_York', label: 'New York (UTC-5)' },
    { value: 'Europe/London', label: 'London (UTC+0)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' }
  ];

  if (!session?.user) {
    return null;
  }


  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* user info */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User /> Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AvatarProfile avatarUrl={session.user.image || ""} />

          <p>Email: <span className="text-gray-400">{session.user.email}</span></p>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => {
                    const inputId = "name-input";
                    const descriptionId = "name-description";
                    const errorId = "name-error";

                    return (
                      <FormItem>
                        <FormLabel htmlFor={inputId}>Nome</FormLabel>
                        <FormControl>
                          <Input
                            id={inputId}
                            placeholder="Digite seu nome"
                            aria-describedby={descriptionId}
                            aria-invalid={fieldState.invalid ? "true" : "false"}
                            aria-errormessage={fieldState.error ? errorId : undefined}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription id={descriptionId}>Atualizar nome</FormDescription>
                        {fieldState.error && (
                          <FormMessage id={errorId}>{fieldState.error.message}</FormMessage>
                        )}
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => {
                    const inputId = "phone-input";
                    const descriptionId = "phone-description";
                    const errorId = "phone-error";

                    return (
                      <FormItem>
                        <FormLabel htmlFor={inputId}>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            id={inputId}
                            type="tel"
                            placeholder="Digite seu telefone"
                            aria-describedby={descriptionId}
                            aria-invalid={fieldState.invalid ? "true" : "false"}
                            aria-errormessage={fieldState.error ? errorId : undefined}
                            {...field}
                            onChange={(e) => {
                              const formattedValue = formatPhone(e.target.value);
                              field.onChange(formattedValue);
                            }}
                          />
                        </FormControl>
                        <FormDescription id={descriptionId}>Atualizar telefone</FormDescription>
                        {fieldState.error && (
                          <FormMessage id={errorId}>{fieldState.error.message}</FormMessage>
                        )}
                      </FormItem>
                    );
                  }}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="w-full" size={"lg"}>
                {isSubmitting
                  ? <p className="flex items-center gap-2 font-semibold"><Loader2 className="w-15 h-15 animate-spin" />Salvando...</p>
                  : <p className="flex items-center gap-2 font-semibold"><Save className="w-15 h-15" /> Salvar</p>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>


      {/* Estatísticas do Usuário */}
      <SettingCard
        title="Suas Estatísticas"
        icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
      >
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{userStats.totalDreams}</div>
            <div className="text-sm text-blue-700">Total de Sonhos</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{userStats.streakDays}</div>
            <div className="text-sm text-green-700">Sequência Atual</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{userStats.longestStreak}</div>
            <div className="text-sm text-purple-700">Maior Sequência</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {userStats.lastDreamDate ? new Date(userStats.lastDreamDate).toLocaleDateString('pt-BR') : 'N/A'}
            </div>
            <div className="text-sm text-orange-700">Último Sonho</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Humores Mais Comuns</h4>
            <div className="space-y-2">
              {Object.entries(userStats.commonMoods).map(([mood, count]) => (
                <div key={mood} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{mood}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Tags Mais Usadas</h4>
            <div className="space-y-2">
              {Object.entries(userStats.commonTags).map(([tag, count]) => (
                <div key={tag} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{tag}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SettingCard>

      {/* Notificações */}
      <SettingCard
        title="Notificações"
        icon={<Bell className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-2">
          <ToggleSwitch
            id="push-notifications"
            checked={userSettings.pushNotifications}
            onChange={(checked) => handleSettingChange('pushNotifications', checked)}
            label="Notificações Push"
            description="Receba notificações em tempo real no dispositivo"
          />
          <ToggleSwitch
            id="email-notifications"
            checked={userSettings.emailNotifications}
            onChange={(checked) => handleSettingChange('emailNotifications', checked)}
            label="Notificações por Email"
            description="Receba resumos e lembretes por email"
          />
          <ToggleSwitch
            id="dream-reminders"
            checked={userSettings.dreamReminders}
            onChange={(checked) => handleSettingChange('dreamReminders', checked)}
            label="Lembretes de Sonhos"
            description="Receba lembretes para registrar seus sonhos"
          />

          {userSettings.dreamReminders && (
            <div className="ml-6 mt-3">
              <label className="block text-sm font-mediu mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Horário do Lembrete
              </label>
              <input
                type="time"
                value={userSettings.reminderTime}
                onChange={(e) => handleSettingChange('reminderTime', e.target.value)}
                className="text-white px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          )}
        </div>
      </SettingCard>

      {/* Privacidade */}
      <SettingCard
        title="Privacidade"
        icon={<Shield className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-2">
          <ToggleSwitch
            id="public-profile"
            checked={userSettings.publicProfile}
            onChange={(checked) => handleSettingChange('publicProfile', checked)}
            label="Perfil Público"
            description="Permitir que outros usuários vejam seu perfil"
          />
          <ToggleSwitch
            id="share-statistics"
            checked={userSettings.shareStatistics}
            onChange={(checked) => handleSettingChange('shareStatistics', checked)}
            label="Compartilhar Estatísticas"
            description="Permitir que suas estatísticas sejam visíveis publicamente"
          />
        </div>
      </SettingCard>

      {/* Configurações do App */}
      <SettingCard
        title="Configurações do App"
        icon={<Globe className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Languages className="w-4 h-4 inline mr-2" />
              Idioma
            </label>
            <select
              value={userSettings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              {languageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Fuso Horário
            </label>
            <select
              value={userSettings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              {timezoneOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </SettingCard>

      {/* Botões de Ação */}
      <div className="col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          <Save className="w-5 h-5" />
          Salvar Alterações
        </Button>
        <Button>
          Cancelar
        </Button>
      </div>

    </section >
  )
}

interface SettingCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function SettingCard({ title, icon, children }: SettingCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}


interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function ToggleSwitch({ id, checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${checked ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          onClick={() => onChange(!checked)}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
        </div>
      </div>
    </div>
  );
}