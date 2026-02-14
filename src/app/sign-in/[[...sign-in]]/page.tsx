import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-navy to-navy-light py-12">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-navy-light border border-white/10 shadow-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20",
            socialButtonsBlockButtonText: "text-white",
            dividerLine: "bg-white/20",
            dividerText: "text-gray-400",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-white/10 border-white/20 text-white placeholder:text-gray-500",
            formButtonPrimary: "bg-electric-blue hover:bg-electric-blue/90 text-white",
            footerActionLink: "text-electric-blue hover:text-electric-blue/80",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-electric-blue",
          },
        }}
      />
    </div>
  );
}
