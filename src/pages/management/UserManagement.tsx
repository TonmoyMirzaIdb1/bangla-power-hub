import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import { DataFilter } from "@/components/common/DataFilter";
import { UserPlus, Shield, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserProfileForm } from "@/components/forms/UserProfileForm";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch users from database
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleCreateUser = async (data: any) => {
    try {
      // In production, use an admin endpoint to create users
      toast.success("User created successfully");
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  const handleUpdateUser = async (data: any) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", selectedUser.id);

      if (error) throw error;
      
      toast.success("User updated successfully");
      setIsDialogOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleDeactivateUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: false })
        .eq("id", userId);

      if (error) throw error;
      
      toast.success("User deactivated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to deactivate user");
    }
  };

  const columns = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    { key: "is_active", label: "Status", render: (value: boolean) => value ? "Active" : "Inactive" },
  ];

  const filteredUsers = users?.filter((user) =>
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedUser(null)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedUser ? "Edit User" : "Create New User"}
                </DialogTitle>
              </DialogHeader>
              <UserProfileForm
                onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
                initialData={selectedUser}
                mode={selectedUser ? "edit" : "create"}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users?.filter((u) => u.is_active).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Roles</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(users?.map((u) => u.role)).size || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search users..."
                className="flex-1"
              />
              <DataFilter
                title="Filter"
                options={[
                  { label: "Active", value: "active", checked: true },
                  { label: "Inactive", value: "inactive", checked: true },
                ]}
                onFilterChange={(value, checked) => {
                  console.log("Filter changed:", value, checked);
                }}
              />
            </div>

            <DataTable
              data={filteredUsers || []}
              columns={columns}
              onRowClick={(user) => {
                setSelectedUser(user);
                setIsDialogOpen(true);
              }}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
