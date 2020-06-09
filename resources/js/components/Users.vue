<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12 " style="text-align: center">
                <div class="card">
                    <div class="card-header align-items-center">
                        <h3 class="card-title text-center">
                            Responsive Hover Table
                        </h3>
                        <div class="card-tools">
                            <button
                                class="btn btn-primary"
                                @click="addNewUserModel"
                            >
                                Add New User
                                <i class="fa fa-user-plus fa-fw"></i>
                            </button>
                        </div>
                    </div>

                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Registered At</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        {{ user.type | capitalize }}
                                    </td>
                                    <td>{{ user.created_at | date }}</td>
                                    <td>
                                        <a
                                            href="#"
                                            @click="editUserModel(user)"
                                        >
                                            <i class="fa fa-edit blue"></i>
                                        </a>
                                        <span>/</span>
                                        <a
                                            href="#"
                                            @click="userDelete(user.id)"
                                        >
                                            <i class="fa fa-trash red"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
                <pulse-loader
                    :loading="loading"
                    :color="color"
                    :size="size"
                ></pulse-loader>
            </div>
        </div>
        <!-- this is the model below -->
        <div
            class="modal fade"
            id="addNewUserModel"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5
                            v-show="!editUser"
                            class="modal-title"
                            id="exampleModalLabel"
                        >
                            Create New User
                        </h5>
                        <h5
                            v-show="editUser"
                            class="modal-title"
                            id="exampleModalLabel"
                        >
                            Update User Info
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form
                        @submit.prevent="editUser ? updateUser() : createUser()"
                    >
                        <div class="modal-body">
                            <div class="form-group">
                                <input
                                    v-model="form.name"
                                    placeholder="Enter Uername"
                                    type="text"
                                    name="name"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('name')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="name"
                                ></has-error>
                            </div>
                            <div class="form-group">
                                <input
                                    v-model="form.email"
                                    placeholder="name@example.com"
                                    type="email"
                                    name="email"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('email')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="email"
                                ></has-error>
                            </div>

                            <div class="form-group">
                                <textarea
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('bio')
                                    }"
                                    name="bio"
                                    v-model="form.bio"
                                    placeholder="Short bio for user (optional)"
                                    id="bio"
                                    rows="3"
                                ></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">
                                <label for="type">Select User Type</label>
                                <select
                                    name="type"
                                    id="type"
                                    v-model="form.type"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('type')
                                    }"
                                >
                                    <option>Admin</option>
                                    <option>Standard User</option>
                                    <option>Author</option>
                                </select>
                                <has-error
                                    :form="form"
                                    field="type"
                                ></has-error>
                            </div>

                            <div class="form-group">
                                <input
                                    v-model="form.password"
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has(
                                            'password'
                                        )
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="password"
                                ></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Dismiss
                            </button>
                            <button
                                v-show="!editUser"
                                type="submit"
                                class="btn btn-primary"
                            >
                                Create <i class="fa fa-user-plus"></i>
                            </button>
                            <button
                                v-show="editUser"
                                type="submit"
                                class="btn btn-success"
                            >
                                Update <i class="fa fa-user-plus"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
    data() {
        return {
            //Pulse Loading Attributes
            loading: true,
            color: "#009688",
            color1: "#5bc0de",
            size: "45px",
            margin: "2px",
            radius: "2px",

            editUser: true,
            users: {},
            form: new Form({
                id: "",
                name: "",
                email: "",
                bio: "",
                type: "",
                password: ""
            })
        };
    },
    components: {
        PulseLoader
    },
    methods: {
        updateUser() {
            this.$Progress.start();
            this.form
                .put("api/user/" + this.form.id)
                .then(() => {
                    Fire.$emit("userCreated");
                    $("#addNewUserModel").modal("hide");
                    Swal.fire(
                        "Updated!",
                        "Selected User has been updated.",
                        "success"
                    );
                    this.$Progress.finish();
                })
                .catch(() => {
                    this.$Progress.fail();
                    Toast.fire({
                        icon: "error",
                        title: "Something went wrong"
                    });
                });
        },
        addNewUserModel() {
            this.form.clear();
            this.editUser = false;
            this.form.reset();
            $("#addNewUserModel").modal("show");
        },
        editUserModel(user) {
            this.editUser = true;
            this.form.clear();
            this.form.fill(user);
            $("#addNewUserModel").modal("show");
        },
        userDelete(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.form
                        .delete("api/user/" + id)
                        .then(() => {
                            Swal.fire(
                                "Deleted!",
                                "Selected User has been deleted.",
                                "success"
                            );
                            Fire.$emit("userCreated");
                        })
                        .catch(() => {
                            Toast.fire({
                                icon: "error",
                                title: "Something went wrong"
                            });
                        });
                }
            });
        },
        createUser() {
            this.$Progress.start();

            this.form
                .post("api/user")
                .then(() => {
                    //After sending a successfull post requrest we are going to emit event name like below name is userCreated
                    Fire.$emit("userCreated");

                    $("#addNewUserModel").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: "User Created Successfully"
                    });

                    this.$Progress.finish();
                })
                .catch(() => {
                    this.$Progress.fail();

                    Toast.fire({
                        icon: "error",
                        title: "Something went wrong"
                    });
                });
        },
        loadUsers() {
      
                this.loading = true;
         
                axios
                    .get("api/user")
                    .then(({ data }) => (this.users = data.data),
                     this.loading = false
                    );
        }
    },
    mounted() {
        this.loadUsers();
        //Here we are listening to the emitted event and do something
        Fire.$on("userCreated", () => {
            this.loadUsers();
        });
    }
};
</script>
