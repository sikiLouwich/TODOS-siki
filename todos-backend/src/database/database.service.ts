import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;
  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      connectionString: this.configService.get('DATABASE_URL'),
    });
  }

  async query(query: string, params: any[] = []) {
      return  this.pool.query(query, params);
  }
}
