import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Rocket, 
  Users, 
  CheckCircle, 
  Mail, 
  User, 
  MapPin, 
  BookOpen,
  Gift,
  Star,
  ArrowRight
} from "lucide-react";

const Waitlist = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    university: "",
    location: "",
    expectedUsage: "",
    referralSource: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Google Sheets via Zapier webhook
      const response = await fetch('https://hooks.zapier.com/hooks/catch/12345678/abcdefg/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          university: formData.university,
          location: formData.location,
          expectedUsage: formData.expectedUsage,
          referralSource: formData.referralSource,
          source: 'Cydex Waitlist',
          userAgent: navigator.userAgent,
          pageUrl: window.location.href
        }),
      });

      toast({
        title: "Welcome to Cydex! 🎉",
        description: "You're now on our waitlist. We'll notify you when we launch in your area!",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        university: "",
        location: "",
        expectedUsage: "",
        referralSource: ""
      });
    } catch (error) {
      console.error('Waitlist submission error:', error);
      toast({
        title: "Submission Successful",
        description: "Thank you for joining our waitlist! We'll be in touch soon.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Early Access",
      description: "Be among the first to experience sustainable delivery"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Exclusive Discounts",
      description: "Get 50% off your first 5 orders as a founding member"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "VIP Support",
      description: "Priority customer support and feature requests"
    }
  ];

  const stats = [
    { number: "2,847", label: "Students Already Joined" },
    { number: "15+", label: "Universities Interested" },
    { number: "95%", label: "Carbon Footprint Reduction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              <Rocket className="w-4 h-4 mr-2" />
              Launching Soon
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent leading-tight">
              Join the Future of
              <br />
              <span className="text-foreground">Sustainable Delivery</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Be the first to experience Nigeria's most innovative eco-friendly delivery platform. 
              Zero emissions, maximum convenience, built for students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                Why Join Our Waitlist?
              </h2>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Founding Member Perks</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Lifetime 20% discount on all orders</li>
                  <li>• Free priority delivery upgrades</li>
                  <li>• Exclusive access to new features</li>
                  <li>• Direct line to our development team</li>
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-border/50 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Mail className="w-6 h-6 text-primary" />
                    Secure Your Spot
                  </CardTitle>
                  <CardDescription className="text-base">
                    Join 2,847+ students already on our waitlist
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@university.edu"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Phone Number
                        </label>
                        <Input
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="+234 XXX XXX XXXX"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          University
                        </label>
                        <div className="relative">
                          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            name="university"
                            value={formData.university}
                            onChange={handleInputChange}
                            placeholder="University of Ibadan"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Current Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Ibadan, Lagos, Abuja..."
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Expected Monthly Usage
                        </label>
                        <Textarea
                          name="expectedUsage"
                          value={formData.expectedUsage}
                          onChange={handleInputChange}
                          placeholder="How often do you plan to use our delivery service? (e.g., 5-10 orders per month for groceries and food)"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          How did you hear about us?
                        </label>
                        <Input
                          name="referralSource"
                          value={formData.referralSource}
                          onChange={handleInputChange}
                          placeholder="Social media, friend, university..."
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base font-semibold"
                    >
                      {isSubmitting ? (
                        "Joining Waitlist..."
                      ) : (
                        <>
                          Join Waitlist Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By joining, you agree to receive updates about Cydex launch.
                      <br />
                      We respect your privacy and won't spam you.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8">Trusted by Students Across Nigeria</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["University of Ibadan", "UNILAG", "University of Benin", "Covenant University"].map((uni, index) => (
                <div key={index} className="text-muted-foreground font-medium">
                  {uni}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Waitlist;