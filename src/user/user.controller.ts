import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add')
  async createUser(@Body() userData: any) {
    try {
      const newUser = await this.userService.createUser(userData);
      return {
        statusCode: 201,
        message: 'User created successfully',
        data: newUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to create user',
        error: error.message,
      };
    }
  }

  @Get('/all')
  async getAllUsers() {
    try {
      const users = await this.userService.getAllUsers();
      return {
        statusCode: 200,
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to fetch users',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (user) {
      return user;
    } else {
      return {
        statusCode: 404,
        message: 'User not found',
      };
    }
  }


  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updatedUser: any) {
    try {
      await this.userService.updateUser(id, updatedUser);
      return {
        statusCode: 200,
        message: 'User updated successfully',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to update user',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUser(id);
      return {
        statusCode: 200,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to delete user',
        error: error.message,
      };
    }
  }
}
