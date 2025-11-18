import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Camera, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useProfile } from "@/hooks/queries/useProfile";

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    // Fetch profile using React Query
    const { data, isLoading, isError } = useProfile();

    // Local editable state
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        avatar: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    // ⚠️ Load API data into state when ready
    useEffect(() => {
        if (data?.data) {
            const u = data.data;

            setProfile({
                name: u.fullName || "",
                email: u.email || "",
                phone: u.phone || "",
                bio: u.bio || "",
                avatar: u.avatar || "",
            });
        }
    }, [data]);

    const handleSave = () => {
        setIsEditing(false);
        toast({
            title: "Profile updated",
            description: "Your profile has been updated successfully.",
        });
    };

    // Loading Skeleton or Loader
    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-muted-foreground">Loading profile...</p>
            </div>
        );
    }

    // Error UI
    if (isError) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500">Failed to load profile</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                            Profile
                        </h1>
                    </div>

                    {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>Save Changes</Button>
                        </div>
                    )}
                </div>
            </header>

            {/* MAIN CONTENT */}
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your profile information and preferences</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={profile.avatar} />
                                    <AvatarFallback className="text-2xl">
                                        {profile.name
                                            ?.split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>

                                {isEditing && (
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            {isEditing && (
                                <p className="text-sm text-muted-foreground">Click to upload new photo</p>
                            )}
                        </div>

                        {/* FORM FIELDS */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    disabled={!isEditing}
                                    rows={4}
                                />
                            </div>
                        </div>

                        {/* Account Settings */}
                        {!isEditing && (
                            <div className="pt-6 border-t space-y-4">
                                <h3 className="font-semibold">Account Settings</h3>

                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full justify-start">
                                        Change Password
                                    </Button>

                                    {/* LOGOUT */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to logout?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => navigate("/login")}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Logout
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
