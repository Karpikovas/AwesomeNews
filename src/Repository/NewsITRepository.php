<?php

namespace App\Repository;

use App\Entity\NewsIT;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method NewsIT|null find($id, $lockMode = null, $lockVersion = null)
 * @method NewsIT|null findOneBy(array $criteria, array $orderBy = null)
 * @method NewsIT[]    findAll()
 * @method NewsIT[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsITRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, NewsIT::class);
    }

    // /**
    //  * @return NewsIT[] Returns an array of NewsIT objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?NewsIT
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
